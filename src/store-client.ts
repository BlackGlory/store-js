import { createRPCClient } from '@utils/rpc-client.js'
import { ClientProxy } from 'delight-rpc'
import { IAPI, IItem, INamespaceStats } from './contract.js'
import { timeoutSignal, withAbortSignal } from 'extra-abort'
import { isUndefined, JSONValue } from '@blackglory/prelude'
export { INamespaceStats, IItem, IncorrectRevision } from './contract.js'

export interface IStoreClientOptions {
  server: string
  timeout?: number
  retryIntervalForReconnection?: number
}

export class StoreClient {
  static async create(options: IStoreClientOptions): Promise<StoreClient> {
    const { client, close } = await createRPCClient(
      options.server
    , options.retryIntervalForReconnection
    )
    return new StoreClient(client, close, options.timeout)
  }

  private constructor(
    private client: ClientProxy<IAPI>
  , private closeClients: () => Promise<void>
  , private timeout?: number
  ) {}

  async close(): Promise<void> {
    await this.closeClients()
  }

  async getNamespaceStats(
    namespace: string
  , timeout?: number
  ): Promise<INamespaceStats> {
    return await this.withTimeout(
      () => this.client.getNamespaceStats(namespace)
    , timeout ?? this.timeout
    )
  }

  async getAllNamespaces(timeout?: number): Promise<string[]> {
    return await this.withTimeout(
      () => this.client.getAllNamespaces()
    , timeout ?? this.timeout
    )
  }

  async getAllItemIds(namespace: string, timeout?: number): Promise<string[]> {
    return await this.withTimeout(
      () => this.client.getAllItemIds(namespace)
    , timeout ?? this.timeout
    )
  }

  async clearItemsByNamespace(namespace: string, timeout?: number): Promise<void> {
    await this.withTimeout(
      () => this.client.clearItemsByNamespace(namespace)
    , timeout ?? this.timeout
    )
  }

  async hasItem(
    namespace: string
  , itemId: string
  , timeout?: number
  ): Promise<boolean> {
    return await this.withTimeout(
      () => this.client.hasItem(namespace, itemId)
    , timeout ?? this.timeout
    )
  }

  async getItem(
    namespace: string
  , itemId: string
  , timeout?: number
  ): Promise<IItem | null> {
    return await this.withTimeout(
      () => this.client.getItem(namespace, itemId)
    , timeout ?? this.timeout
    )
  }

  /**
   * @throws {IncorrectRevision}
   * 在提供revision参数的情况下, 如果目标项目的revision值不等于参数, 或项目不存在, 则抛出此错误.
   */
  async setItem(
    namespace: string
  , itemId: string
  , value: JSONValue
  , revision?: string
  , timeout?: number
  ): Promise<string> {
    return await this.withTimeout(() => {
      if (isUndefined(revision)) {
        return this.client.setItem(namespace, itemId, value)
      } else {
        return this.client.setItem(namespace, itemId, value, revision)
      }
    }, timeout ?? this.timeout)
  }

  /**
   * @throws {IncorrectRevision}
   * 在提供revision参数的情况下, 如果目标项目的revision值不等于参数, 或项目不存在, 则抛出此错误.
   */
  async removeItem(
    namespace: string
  , itemId: string
  , revision?: string
  , timeout?: number
  ): Promise<void> {
    await this.withTimeout(() => {
      if (isUndefined(revision)) {
        return this.client.removeItem(namespace, itemId)
      } else {
        return this.client.removeItem(namespace, itemId, revision)
      }
    }, timeout ?? this.timeout)
  }

  private async withTimeout<T>(
    fn: () => PromiseLike<T>
  , timeout: number | undefined = this.timeout
  ): Promise<T> {
    if (timeout) {
      return await withAbortSignal(timeoutSignal(timeout), fn)
    } else {
      return await fn()
    }
  }
}
