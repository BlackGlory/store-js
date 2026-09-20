# store-js
## Install
```sh
npm install --save @blackglory/store-js
# or
yarn add @blackglory/store-js
```

## API
### StoreClient
```ts
interface IStoreClientOptions {
  server: string

  basicAuth?: {
    username: string
    password: string
  }
  timeout?: number
  retryIntervalForReconnection?: number
}

interface IStoreClientRequestOptions {
  signal?: AbortSignal
  timeout?: number | false
}

interface INamespaceStats {
  items: number
}

interface IItem {
  value: JSONValue
  revision: string
}

class IncorrectRevision extends CustomError {}

class StoreClient {
  static create(options: IStoreClientOptions): Promise<StoreClient>

  close(): Promise<void>

  getNamespaceStats(
    namespace: string
  , signalOrOptions?: AbortSignal | IStoreClientRequestOptions
  ): Promise<INamespaceStats>

  getAllNamespaces(
    signalOrOptions?: AbortSignal | IStoreClientRequestOptions
  ): Promise<string[]>

  getAllItemIds(
    namespace: string
  , signalOrOptions?: AbortSignal | IStoreClientRequestOptions
  ): Promise<string[]>

  clearItemsByNamespace(
    namespace: string
  , signalOrOptions?: AbortSignal | IStoreClientRequestOptions
  ): Promise<void>

  hasItem(
    namespace: string
  , itemId: string
  , signalOrOptions?: AbortSignal | IStoreClientRequestOptions
  ): Promise<boolean>

  getItem(
    namespace: string
  , itemId: string
  , signalOrOptions?: AbortSignal | IStoreClientRequestOptions
  ): Promise<IItem | null>

  /**
   * @throws {IncorrectRevision}
   * 在提供revision参数的情况下, 如果目标项目的revision值不等于参数, 或项目不存在, 则抛出此错误.
   */
  setItem(
    namespace: string
  , itemId: string
  , value: JSONValue
  , revision?: string | null
  , signalOrOptions?: AbortSignal | IStoreClientRequestOptions
  ): Promise<string>

  /**
   * @throws {IncorrectRevision}
   * 在提供revision参数的情况下, 如果目标项目的revision值不等于参数, 或项目不存在, 则抛出此错误.
   */
  removeItem(
    namespace: string
  , itemId: string
  , revision?: string
  , signalOrOptions?: AbortSignal | IStoreClientRequestOptions
  ): Promise<void>
}
```
