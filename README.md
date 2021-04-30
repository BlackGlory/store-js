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
StoreClient#set(
  namespace: string
, id: string
, payload: string
, options?: IStoreClientRequestOptionsWithRevision
): Promise<void>
```

#### setJSON

```ts
StoreClient#setJSON(
  namespace: string
, id: string
, payload: Json
, options?: IStoreClientRequestOptionsWithRevision
): Promise<void>
```

#### setCSV

```ts
StoreClient#setJSON<T extends object>(
  namespace: string
, id: string
, payload: T[]
, options?: IStoreClientRequestOptionsWithRevision
): Promise<void>
```

#### has

```ts
StoreClient#has(
  namespace: string
, id: string
, options?: IStoreClientRequestOptionsWithRevision
): Promise<boolean>
```

#### get

```ts
StoreClient#get(
  namespace: string
, id: string
, options?: IStoreClientRequestOptionsWithRevision
): Promise<{
  revision: string
  payload: string
}>
```

#### tryGet

```ts
StoreClient#tryGet(
  namespace: string
, id: string
, options?: IStoreClientRequestOptionsWithRevision
): Promise<{
  revision: string
  payload: string
} | null>
```

#### getJSON

```ts
StoreClient#getJSON(
  namespace: string
, id: string
, options?: IStoreClientRequestOptionsWithRevision
): Promise<{
  revision: string
  payload: Json
}>
```

#### tryGetJSON

```ts
StoreClient#tryGetJSON(
  namespace: string
, id: string
, options?: IStoreClientRequestOptionsWithRevision
): Promise<{
  revision: string
  payload: Json
} | null>
```

#### getCSV

```ts
StoreClient#getCSV<T extends object>(
  namespace: string
, id: string
, options?: IStoreClientRequestOptionsWithRevision
): Promise<{
  revision: string
  payload: T[]
}>
```

#### tryGetCSV

```ts
StoreClient#tryGetCSV<T extends object>(
  namespace: string
, id: string
, options?: IStoreClientRequestOptionsWithRevision
): Promise<{
  revision: string
  payload: T[]
} | null>
```

#### del

```ts
StoreClient#del(
  namespace: string
, id: string
, options?: IStoreClientRequestOptionsWithRevision
): Promise<void>
```

#### clear

```ts
StoreClient#clear(
  namespace: string
, options?: IStoreClientRequestOptions
): Promise<void>
```

#### getAllItemIds

```ts
StoreClient#getAllItemIds(
  namespace: string
, options?: IStoreClientRequestOptions
): Promise<bigint[]>
```

#### getAllNamespaces

```ts
StoreClient#getAllNamespaces(
  options?: IStoreClientRequestOptionsWithoutToken
): Promise<string[]>
```

#### stats

```ts
StoreClient#stats(
  namespace: string
, options?: IStoreClientRequestOptionsWithoutToken
): Promise<<{
  namespace: string
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

##### getNamespaces

```ts
StoreManager#JsonSchema.getNamespaces(
  options?: IStoreManagerRequestOptions
): Promise<string[]>
```

##### get

```ts
StoreManager#JsonSchema.get(namespace: string, options?: IStoreManagerRequestOptions): Promise<Json>
```

##### set

```ts
StoreManager#JsonSchema.set(
  namespace: string
, schema: Json
, options?: IStoreManagerRequestOptions
): Promise<void>
```

##### remove

```ts
StoreManager#JsonSchema.remove(
  namespace: string
, options?: IStoreManagerRequestOptions
): Promise<void>
```

#### RevisionPolicy

##### getNamespaces

```ts
StoreManager#RevisionPolicy.getNamespaces(
  options?: IStoreManagerRequestOptions
): Promise<string[]>
```

##### get

```ts
StoreManager#RevisionPolicy.get(
  namespace: string
, options?: IStoreManagerRequestOptions
): Promise<{
  updateRevisionRequired: boolean | null
  deleteRevisionRequired: boolean | null
}>
```

##### setUpdateRevisionRequired

```ts
StoreManager#RevisionPolicy.setUpdateRevisionRequired(
  namespace: string
, val: boolean
, options?: IStoreManagerRequestOptions
): Promise<void>
```

##### removeUpdateRevisionRequired

```ts
StoreManager#RevisionPolicy.removeUpdateRevisionRequired(
  namespace: string
, options?: IStoreManagerRequestOptions
): Promise<void>
```

##### setDeleteRevisionRequired

```ts
StoreManager#RevisionPolicy.setDeleteRevisionRequired(
  namespace: string
, val: boolean
, options?: IStoreManagerRequestOptions
): Promise<void>
```

##### removeDeleteRevisionRequired

```ts
StoreManager#RevisionPolicy.removeDeleteRevisionRequired(
  namespace: string
, options?: IStoreManagerRequestOptions
): Promise<void>
```

#### Blacklist

##### getNamespaces

```ts
StoreManager#Blacklist.getNamespaces(
  options?: IStoreManagerRequestOptions
): Promise<string[]>
```

##### add

```ts
StoreManager#Blacklist.add(
  namespace: string
, options?: IStoreManagerRequestOptions
): Promise<void>
```

##### remove

```ts
StoreManager#Blacklist.remove(
  namespace: string
, options?: IStoreManagerRequestOptions
): Promise<void>
```

#### Whitelist

##### getNamespaces

```ts
StoreManager#Whitelist.getNamespaces(
  options?: IStoreManagerRequestOptions
): Promise<string[]>
```

##### add

```ts
StoreManager#Whitelist.add(
  namespace: string
, options?: IStoreManagerRequestOptions
): Promise<void>
```

##### remove

```ts
StoreManager#Whitelist.remove(
  namespace: string
, options?: IStoreManagerRequestOptions
): Promise<void>
```

#### TokenPolicy

##### getNamespaces

```ts
StoreManager#TokenPolicy.getNamespaces(
  options?: IStoreManagerRequestOptions
): Promise<string[]>
```

##### get

```ts
StoreManager#TokenPolicy.get(
  namespace: string
, options?: IStoreManagerRequestOptions
): Promise<{
  writeTokenRequired: boolean | null
  readTokenRequired: boolean | null
  deleteTokenRequired: boolean | null
}>
```

##### setWriteTokenRequired

```ts
StoreManager#TokenPolicy.setWriteTokenRequired(
  namespace: string
, val: boolean
, options?: IStoreManagerRequestOptions
): Promise<void>
```

##### removeWriteTokenRequired

```ts
StoreManager#TokenPolicy.removeWriteTokenRequired(
  namespace: string
, options?: IStoreManagerRequestOptions
): Promise<void>
```

##### setReadTokenRequired


```ts
StoreManager#TokenPolicy.setReadTokenRequired(
  namespace: string
, val: boolean
, options?: IStoreManagerRequestOptions
): Promise<void>
```

##### removeReadTokenRequired

```ts
StoreManager#TokenPolicy.removeReadTokenRequired(
  namespace: string
, options?: IStoreManagerRequestOptions
): Promise<void>
```

##### setDeleteTokenRequired

```ts
StoreManager#TokenPolicy.setDeleteTokenRequired(
  namespace: string
, val: boolean
, options?: IStoreManagerRequestOptions
): Promise<void>
```

##### removeDeleteTokenRequired

```ts
StoreManager#TokenPolicy.removeDeleteTokenRequired(
  namespace: string
, options?: IStoreManagerRequestOptions
): Promise<void>
```

#### Token

##### getNamespaces

```ts
StoreManager#Token.getNamespaces(options?: IStoreManagerRequestOptions): Promise<string[]>
```

##### getTokens

```ts
StoreManager#Token.getTokens(
  namespace: string
, options?: IStoreManagerRequestOptions
): Promise<Array<{
  token: string
  write: boolean
  read: boolean
  delete: boolean
}>>
```

##### addWriteToken

```ts
StoreManager#Token.addWriteToken(
  namespace: string
, token: string
, options?: IStoreManagerRequestOptions
): Promise<void>
```

##### removeWriteToken

```ts
StoreManager#Token.removeWriteToken(
  namespace: string
, token: string
, options?: IStoreManagerRequestOptions
): Promise<void>
```

##### addReadToken

```ts
StoreManager#Token.addReadToken(
  namespace: string
, token: string
, options?: IStoreManagerRequestOptions
): Promise<void>
```

##### removeReadToken

```ts
StoreManager#Token.removeReadToken(
  namespace: string
, token: string
, options?: IStoreManagerRequestOptions
): Promise<void>
```

##### addDeleteToken

```ts
StoreManager#Token.addDeleteToken(
  namespace: string
, token: string
, options?: IStoreManagerRequestOptions
): Promise<void>
```

##### removeDeleteToken

```ts
StoreManager#Token.removeDeleteToken(
  namespace: string
, token: string
, options?: IStoreManagerRequestOptions
): Promise<void>
```
