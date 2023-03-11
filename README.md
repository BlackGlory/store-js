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

interface IStats {
  namespace: string
  items: number
}

interface IItem {
  value: string
  revision: string
}

class IncorrectRevision extends CustomError {}

class StoreClient {
  static create(options: IStoreClientOptions): Promise<StoreClient>

  close(): Promise<void>

  stats(namespace: string, timeout?: number): Promise<IStats>
  getAllNamespaces(timeout?: number): Promise<string[]>
  getAllItemIds(namespace: string, timeout?: number): Promise<string[]>

  clearItemsByNamespace(namespace: string, timeout?: number): Promise<void>

  hasItem(namespace: string, itemId: string, timeout?: number): Promise<boolean>
  getItem(namespace: string, itemId: string, timeout?: number): Promise<IItem | null>

  /**
   * @throws {IncorrectRevision}
   * 在提供revision参数的情况下, 如果目标项目的revision值不等于参数, 或项目不存在, 则抛出此错误.
   */
  setItem(
    namespace: string
  , itemId: string
  , value: string
  , revision?: string
  , timeout?: number
  ): Promise<Revision>

  /**
   * @throws {IncorrectRevision}
   * 在提供revision参数的情况下, 如果目标项目的revision值不等于参数, 或项目不存在, 则抛出此错误.
   */
  removeItem(
    namespace: string
  , itemId: string
  , revision?: string
  , timeout?: number
  ): Promise<void>
}
```
