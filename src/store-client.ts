import { createRPCClient } from '@utils/rpc-client.js'
import { ClientProxy } from 'delight-rpc'
import { IAPI, IItem, INamespaceStats } from './contract.js'
import { raceAbortSignals, timeoutSignal, isAbortSignal } from 'extra-abort'
import { isUndefined, JSONValue } from '@blackglory/prelude'
export { INamespaceStats, IItem, IncorrectRevision } from './contract.js'

export interface IStoreClientOptions {
  server: string
  timeout?: number
  retryIntervalForReconnection?: number
}

export interface IStoreClientRequestOptions {
  signal?: AbortSignal
  timeout?: number | false
}

export class StoreClient {
  static async create(options: IStoreClientOptions): Promise<StoreClient> {
    const { client, close } = await createRPCClient(
      options.server
    , options.retryIntervalForReconnection
    , options.timeout
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
  , signalOrOptions?: AbortSignal | IStoreClientRequestOptions
  ): Promise<INamespaceStats> {
    return await this.client.getNamespaceStats(
      namespace
    , this.createSignal(signalOrOptions)
    )
  }

  async getAllNamespaces(
    signalOrOptions?: AbortSignal | IStoreClientRequestOptions
  ): Promise<string[]> {
    return await this.client.getAllNamespaces(
      this.createSignal(signalOrOptions)
    )
  }

  async getAllItemIds(
    namespace: string
  , signalOrOptions?: AbortSignal | IStoreClientRequestOptions
  ): Promise<string[]> {
    return await this.client.getAllItemIds(
      namespace
    , this.createSignal(signalOrOptions)
    )
  }

  async clearItemsByNamespace(
    namespace: string
  , signalOrOptions?: AbortSignal | IStoreClientRequestOptions
  ): Promise<void> {
    await this.client.clearItemsByNamespace(
      namespace
    , this.createSignal(signalOrOptions)
    )
  }

  async hasItem(
    namespace: string
  , itemId: string
  , signalOrOptions?: AbortSignal | IStoreClientRequestOptions
  ): Promise<boolean> {
    return await this.client.hasItem(
      namespace
    , itemId
    , this.createSignal(signalOrOptions)
    )
  }

  async getItem(
    namespace: string
  , itemId: string
  , signalOrOptions?: AbortSignal | IStoreClientRequestOptions
  ): Promise<IItem | null> {
    return await this.client.getItem(
      namespace
    , itemId
    , this.createSignal(signalOrOptions)
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
  , revision?: string | null
  , signalOrOptions?: AbortSignal | IStoreClientRequestOptions
  ): Promise<string> {
    if (isUndefined(revision)) {
      return await this.client.setItem(
        namespace
      , itemId
      , value
      , this.createSignal(signalOrOptions)
      )
    } else {
      return await this.client.setItem(
        namespace
      , itemId
      , value
      , revision
      , this.createSignal(signalOrOptions)
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
  , signalOrOptions?: AbortSignal | IStoreClientRequestOptions
  ): Promise<void> {
    if (isUndefined(revision)) {
      await this.client.removeItem(
        namespace
      , itemId
      , this.createSignal(signalOrOptions)
      )
    } else {
      await this.client.removeItem(
        namespace
      , itemId
      , revision
      , this.createSignal(signalOrOptions)
      )
    }
  }

  private createSignal(
    signalOrOptions: AbortSignal | IStoreClientRequestOptions = {}
  ): AbortSignal {
    const options: IStoreClientRequestOptions = isAbortSignal(signalOrOptions)
                                              ? { signal: signalOrOptions }
                                              : signalOrOptions

    return raceAbortSignals([
      options.signal
    , options.timeout !== false && (
        (options.timeout && timeoutSignal(options.timeout)) ??
        (this.timeout && timeoutSignal(this.timeout))
      )
    ])
  }
}
