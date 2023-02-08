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

class StoreClient {
  static create(options: IStoreClientOptions): Promise<StoreClient>

  close(): Promise<void>

  stats(namespace: string, timeout?: number): Promise<IStats>
  getAllNamespaces(timeout?: number): Promise<string[]>
  getAllItemIds(namespace: string, timeout?: number): Promise<string[]>

  clearItemsByNamespace(namespace: string, timeout?: number): Promise<void>

  hasItem(namespace: string, itemId: string, timeout?: number): Promise<boolean>
  getItem(namespace: string, itemId: string, timeout?: number): Promise<IItem | null>

  setItem(
    namespace: string
  , itemId: string
  , value: string
  , revision?: Revision
  , timeout?: number
  ): Promise<Revision>

  removeItem(
    namespace: string
  , itemId: string
  , revision?: Revision
  , timeout?: number
  ): Promise<void>
}
```
