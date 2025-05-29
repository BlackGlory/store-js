import { createRPCClient } from '@utils/rpc-client.js'
import { ClientProxy } from 'delight-rpc'
import { IAPI, IItem, INamespaceStats } from './contract.js'
import { raceAbortSignals, timeoutSignal } from 'extra-abort'
import { isntUndefined, isUndefined, JSONValue } from '@blackglory/prelude'
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
  , signal?: AbortSignal
  ): Promise<INamespaceStats> {
    return await this.client.getNamespaceStats(
      namespace
    , this.withTimeout(signal)
    )
  }

  async getAllNamespaces(signal?: AbortSignal): Promise<string[]> {
    return await this.client.getAllNamespaces(this.withTimeout(signal))
  }

  async getAllItemIds(namespace: string, signal?: AbortSignal): Promise<string[]> {
    return await this.client.getAllItemIds(namespace, this.withTimeout(signal))
  }

  async clearItemsByNamespace(
    namespace: string
  , signal?: AbortSignal
  ): Promise<void> {
    await this.client.clearItemsByNamespace(namespace, this.withTimeout(signal))
  }

  async hasItem(
    namespace: string
  , itemId: string
  , signal?: AbortSignal
  ): Promise<boolean> {
    return await this.client.hasItem(namespace, itemId, this.withTimeout(signal))
  }

  async getItem(
    namespace: string
  , itemId: string
  , signal?: AbortSignal
  ): Promise<IItem | null> {
    return await this.client.getItem(namespace, itemId, this.withTimeout(signal))
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
  , signal?: AbortSignal
  ): Promise<string> {
    if (isUndefined(revision)) {
      return await this.client.setItem(
        namespace
      , itemId
      , value
      , this.withTimeout(signal)
      )
    } else {
      return await this.client.setItem(
        namespace
      , itemId
      , value
      , revision
      , this.withTimeout(signal)
      )
    }
  }

  /**
   * @throws {IncorrectRevision}
   * 在提供revision参数的情况下, 如果目标项目的revision值不等于参数, 或项目不存在, 则抛出此错误.
   */
  async removeItem(
    namespace: string
  , itemId: string
  , revision?: string
  , signal?: AbortSignal
  ): Promise<void> {
    if (isUndefined(revision)) {
      await this.client.removeItem(
        namespace
      , itemId
      , this.withTimeout(signal)
      )
    } else {
      await this.client.removeItem(
        namespace
      , itemId
      , revision
      , this.withTimeout(signal)
      )
    }
  }

  private withTimeout(signal?: AbortSignal): AbortSignal {
    return raceAbortSignals([
      isntUndefined(this.timeout) && timeoutSignal(this.timeout)
    , signal
    ])
  }
}
