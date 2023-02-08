import { createRPCClient } from '@utils/rpc-client.js'
import { ClientProxy, BatchClient, BatchClientProxy } from 'delight-rpc'
import { IAPI, IItem, IStats, Revision } from './contract.js'
import { timeoutSignal, withAbortSignal } from 'extra-abort'
import { isUndefined } from '@blackglory/prelude'
export { IStats } from './contract.js'

export interface IStoreClientOptions {
  server: string
  timeout?: number
  retryIntervalForReconnection?: number
}

export class StoreClient {
  static async create(options: IStoreClientOptions): Promise<StoreClient> {
    const { client, batchClient, proxy, close } = await createRPCClient(options.server)
    return new StoreClient(client, batchClient, proxy, close, options.timeout)
  }

  private constructor(
    private client: ClientProxy<IAPI>
  , private batchClient: BatchClient
  , private batchProxy: BatchClientProxy<IAPI, unknown>
  , private closeClients: () => Promise<void>
  , private timeout?: number
  ) {}

  async close(): Promise<void> {
    await this.closeClients()
  }

  async stats(namespace: string, timeout?: number): Promise<IStats> {
    return await this.withTimeout(
      () => this.client.stats(namespace)
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

  async hasItem(namespace: string, itemId: string, timeout?: number): Promise<boolean> {
    return await this.withTimeout(
      () => this.client.hasItem(namespace, itemId)
    , timeout ?? this.timeout
    )
  }

  async getItem(namespace: string, itemId: string, timeout?: number): Promise<IItem | null> {
    return await this.withTimeout(
      () => this.client.getItem(namespace, itemId)
    , timeout ?? this.timeout
    )
  }

  async setItem(
    namespace: string
  , itemId: string
  , value: string
  , revision?: Revision
  , timeout?: number
  ): Promise<Revision> {
    return await this.withTimeout(() => {
      if (isUndefined(revision)) {
        return this.client.setItem(namespace, itemId, value)
      } else {
        return this.client.setItem(namespace, itemId, value, revision)
      }
    }, timeout ?? this.timeout)
  }

  async removeItem(
    namespace: string
  , itemId: string
  , revision?: Revision
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
