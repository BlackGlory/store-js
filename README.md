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
new StoreClient({
  server: string
, token?: string
, basicAuth?: {
    username: string
  , password: string
  }
, keepalive?: boolean
})
```

```ts
interface IStoreClientRequestOptions {
  signal?: AbortSignal
  token?: string
  keepalive?: boolean
}

interface IStoreClientRequestOptionsWithRevision extends IStoreClientRequestOptions {
  revision?: string
}

interface IStoreClientRequestOptionsWithoutToken {
  signal?: AbortSignal
  keepalive?: boolean
}
```

#### set

```ts
StoreClient#set(storeId: string, itemId: string, payload: string, options?: IStoreClientRequestOptionsWithRevision): Promise<void>
```

#### setJSON

```ts
StoreClient#setJSON(storeId: string, itemId: string, payload: Json, options?: IStoreClientRequestOptionsWithRevision): Promise<void>
```

#### setCSV

```ts
StoreClient#setJSON<T extends object>(storeId: string, itemId: string, payload: T[], options?: IStoreClientRequestOptionsWithRevision): Promise<void>
```

#### has

```ts
StoreClient#has(storeId: string, itemId: string, options?: IStoreClientRequestOptionsWithRevision): Promise<boolean>
```

#### get

```ts
StoreClient#get(storeId: string, itemId: string, options?: IStoreClientRequestOptionsWithRevision): Promise<{
  revision: string
  payload: string
}>
```

#### getJSON

```ts
StoreClient#getJSON(storeId: string, itemId: string, options?: IStoreClientRequestOptionsWithRevision): Promise<{
  revision: string
  payload: Json
}>
```

#### getCSV

```ts
StoreClient#getCSV<T extends object>(storeId: string, itemId: string, options?: IStoreClientRequestOptionsWithRevision): Promise<{
  revision: string
  payload: T[]
}>
```

#### del

```ts
StoreClient#del(storeId: string, itemId: string, options?: IStoreClientRequestOptionsWithRevision): Promise<void>
```

#### clear

```ts
StoreClient#clear(storeId: string, options?: IStoreClientRequestOptions): Promise<void>
```

#### getAllItemIds

```ts
StoreClient#getAllItemIds(storeId: string, options?: IStoreClientRequestOptions): Promise<string[]>
```

#### getAllStoreIds

```ts
StoreClient#getAllStoreIds(options?: IStoreClientRequestOptionsWithoutToken): Promise<string[]>
```

#### stats

```ts
StoreClient#stats(storeId: string, options?: IStoreClientRequestOptionsWithoutToken): Promise<<{
  id: string
  items: number
}>
```

### StoreManager

```ts
new StoreManager({
  server: string
  adminPassword: string
})
```

```ts
interface IStoreManagerRequestOptions {
  signal?: AbortSignal
}
```

#### JsonSchema

##### getIds

```ts
StoreManager#JsonSchema.getIds(options?: IStoreManagerRequestOptions): Promise<string[]>
```

##### get

```ts
StoreManager#JsonSchema.get(id: string, options?: IStoreManagerRequestOptions): Promise<Json>
```

##### set

```ts
StoreManager#JsonSchema.set(id: string, schema: Json, options?: IStoreManagerRequestOptions): Promise<void>
```

##### remove

```ts
StoreManager#JsonSchema.remove(id: string, options?: IStoreManagerRequestOptions): Promise<void>
```

#### RevisionPolicy

##### getIds

```ts
StoreManager#RevisionPolicy.getIds(options?: IStoreManagerRequestOptions): Promise<string[]>
```

##### get

```ts
StoreManager#RevisionPolicy.get(id: string, options?: IStoreManagerRequestOptions): Promise<{
  updateRevisionRequired: boolean | null
  deleteRevisionRequired: boolean | null
}>
```

##### setUpdateRevisionRequired

```ts
StoreManager#RevisionPolicy.setUpdateRevisionRequired(id: string, val: boolean, options?: IStoreManagerRequestOptions): Promise<void>
```

##### removeUpdateRevisionRequired

```ts
StoreManager#RevisionPolicy.removeUpdateRevisionRequired(id: string, options?: IStoreManagerRequestOptions): Promise<void>
```

##### setDeleteRevisionRequired

```ts
StoreManager#RevisionPolicy.setDeleteRevisionRequired(id: string, val: boolean, options?: IStoreManagerRequestOptions): Promise<void>
```

##### removeDeleteRevisionRequired

```ts
StoreManager#RevisionPolicy.removeDeleteRevisionRequired(id: string, options?: IStoreManagerRequestOptions): Promise<void>
```

#### Blacklist

##### getIds

```ts
StoreManager#Blacklist.getIds(options?: IStoreManagerRequestOptions): Promise<string[]>
```

##### add

```ts
StoreManager#Blacklist.add(id: string, options?: IStoreManagerRequestOptions): Promise<void>
```

##### remove

```ts
StoreManager#Blacklist.remove(id: string, options?: IStoreManagerRequestOptions): Promise<void>
```

#### Whitelist

##### getIds

```ts
StoreManager#Whitelist.getIds(options?: IStoreManagerRequestOptions): Promise<string[]>
```

##### add

```ts
StoreManager#Whitelist.add(id: string, options?: IStoreManagerRequestOptions): Promise<void>
```

##### remove

```ts
StoreManager#Whitelist.remove(id: string, options?: IStoreManagerRequestOptions): Promise<void>
```

#### TokenPolicy

##### getIds

```ts
StoreManager#TokenPolicy.getIds(options?: IStoreManagerRequestOptions): Promise<string[]>
```

##### get

```ts
StoreManager#TokenPolicy.get(id: string, options?: IStoreManagerRequestOptions): Promise<{
  writeTokenRequired: boolean | null
  readTokenRequired: boolean | null
  deleteTokenRequired: boolean | null
}>
```

##### setWriteTokenRequired

```ts
StoreManager#TokenPolicy.setWriteTokenRequired(id: string, val: boolean, options?: IStoreManagerRequestOptions): Promise<void>
```

##### removeWriteTokenRequired

```ts
StoreManager#TokenPolicy.removeWriteTokenRequired(id: string, options?: IStoreManagerRequestOptions): Promise<void>
```

##### setReadTokenRequired


```ts
StoreManager#TokenPolicy.setReadTokenRequired(id: string, val: boolean, options?: IStoreManagerRequestOptions): Promise<void>
```

##### removeReadTokenRequired

```ts
StoreManager#TokenPolicy.removeReadTokenRequired(id: string, options?: IStoreManagerRequestOptions): Promise<void>
```

##### setDeleteTokenRequired

```ts
StoreManager#TokenPolicy.setDeleteTokenRequired(id: string, val: boolean, options?: IStoreManagerRequestOptions): Promise<void>
```

##### removeDeleteTokenRequired

```ts
StoreManager#TokenPolicy.removeDeleteTokenRequired(id: string, options?: IStoreManagerRequestOptions): Promise<void>
```

#### Token

##### getIds

```ts
StoreManager#Token.getIds(options?: IStoreManagerRequestOptions): Promise<string[]>
```

##### getTokens

```ts
StoreManager#Token.getTokens(id: string, options?: IStoreManagerRequestOptions): Promise<Array<{
  token: string
  write: boolean
  read: boolean
  delete: boolean
}>>
```

##### addWriteToken

```ts
StoreManager#Token.addWriteToken(id: string, token: string, options?: IStoreManagerRequestOptions): Promise<void>
```

##### removeWriteToken

```ts
StoreManager#Token.removeWriteToken(id: string, token: string, options?: IStoreManagerRequestOptions): Promise<void>
```

##### addReadToken

```ts
StoreManager#Token.addReadToken(id: string, token: string, options?: IStoreManagerRequestOptions): Promise<void>
```

##### removeReadToken

```ts
StoreManager#Token.removeReadToken(id: string, token: string, options?: IStoreManagerRequestOptions): Promise<void>
```

##### addDeleteToken

```ts
StoreManager#Token.addDeleteToken(id: string, token: string, options?: IStoreManagerRequestOptions): Promise<void>
```

##### removeDeleteToken

```ts
StoreManager#Token.removeDeleteToken(id: string, token: string, options?: IStoreManagerRequestOptions): Promise<void>
```
