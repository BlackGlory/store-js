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
  timeout?: number
  retryIntervalForReconnection?: number
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
  , signal?: AbortSignal
  ): Promise<INamespaceStats>

  getAllNamespaces(signal?: AbortSignal): Promise<string[]>

  getAllItemIds(namespace: string, signal?: AbortSignal): Promise<string[]>

  clearItemsByNamespace(namespace: string, signal?: AbortSignal): Promise<void>

  hasItem(
    namespace: string
  , itemId: string
  , signal?: AbortSignal
  ): Promise<boolean>

  getItem(
    namespace: string
  , itemId: string
  , signal?: AbortSignal
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
  , signal?: AbortSignal
  ): Promise<string>

  /**
   * @throws {IncorrectRevision}
   * 在提供revision参数的情况下, 如果目标项目的revision值不等于参数, 或项目不存在, 则抛出此错误.
   */
  removeItem(
    namespace: string
  , itemId: string
  , revision?: string
  , signal?: AbortSignal
  ): Promise<void>
}
```
