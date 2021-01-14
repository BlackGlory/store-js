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
})
```

```ts
interface StoreClientRequestOptions {
  signal?: AbortSignal
  token?: string
}

interface StoreClientRequestOptionsWithRevision extends StoreClientRequestOptions {
  rev?: string
}

interface StoreClientRequestOptionsWithoutToken {
  signal?: AbortSignal
}
```


#### set

```ts
StoreClient#set(storeId: string, itemId: string, doc: string, options?: StoreClientRequestOptionsWithRevision): Promise<void>
```

#### setJSON

```ts
StoreClient#setJSON(storeId: string, itemId: string, doc: Json, options?: StoreClientRequestOptionsWithRevision): Promise<void>
```

#### setCSV

```ts
StoreClient#setJSON<T extends object>(storeId: string, itemId: string, doc: T[], options?: StoreClientRequestOptionsWithRevision): Promise<void>
```

#### has

```ts
StoreClient#has(storeId: string, itemId: string, options?: StoreClientRequestOptionsWithRevision): Promise<boolean>
```

#### get

```ts
StoreClient#get(storeId: string, itemId: string, options?: StoreClientRequestOptionsWithRevision): Promise<{
  rev: string
  doc: string
}>
```

#### getJSON

```ts
StoreClient#getJSON(storeId: string, itemId: string, options?: StoreClientRequestOptionsWithRevision): Promise<{
  rev: string
  doc: Json
}>
```

#### getCSV

```ts
StoreClient#getCSV<T extends object>(storeId: string, itemId: string, options?: StoreClientRequestOptionsWithRevision): Promise<{
  rev: string
  doc: T[]
}>
```

#### del

```ts
StoreClient#del(storeId: string, itemId: string, options?: StoreClientRequestOptionsWithRevision): Promise<void>
```

#### clear

```ts
StoreClient#clear(storeId: string, options?: StoreClientRequestOptions): Promise<void>
```

#### listItems

```ts
StoreClient#listItems(storeId: string, options?: StoreClientRequestOptions): Promise<string[]>
```

#### listStores

```ts
StoreClient#listStores(options?: StoreClientRequestOptionsWithoutToken): Promise<string[]>
```

#### stats

```ts
StoreClient#stats(storeId: string, options?: StoreClientRequestOptionsWithoutToken): Promise<<{
  id: string
  items: number
}>
```

### StoreManager

```ts
new StoreManager({
  server: string
, adminPassword: string
})
```

```ts
interface StoreManagerRequestOptions {
  signal?: AbortSignal
}
```

#### JsonSchema

##### getIds

```ts
StoreManager#JsonSchema.getIds(options?: StoreManagerRequestOptions): Promise<string[]>
```

##### get

```ts
StoreManager#JsonSchema.get(id: string, options?: StoreManagerRequestOptions): Promise<Json>
```

##### set

```ts
StoreManager#JsonSchema.set(id: string, schema: Json, options?: StoreManagerRequestOptions): Promise<void>
```

##### remove

```ts
StoreManager#JsonSchema.remove(id: string, options?: StoreManagerRequestOptions): Promise<void>
```

#### RevisionPolicy

##### getIds

```ts
StoreManager#RevisionPolicy.getIds(options?: StoreManagerRequestOptions): Promise<string[]>
```

##### get

```ts
StoreManager#RevisionPolicy.get(id: string, options?: StoreManagerRequestOptions): Promise<{
  updateRevisionRequired: boolean | null
  deleteRevisionRequired: boolean | null
}>
```

##### setUpdateRevisionRequired

```ts
StoreManager#RevisionPolicy.setUpdateRevisionRequired(id: string, val: boolean, options?: StoreManagerRequestOptions): Promise<void>
```

##### removeUpdateRevisionRequired

```ts
StoreManager#RevisionPolicy.removeUpdateRevisionRequired(id: string, options?: StoreManagerRequestOptions): Promise<void>
```

##### setDeleteRevisionRequired

```ts
StoreManager#RevisionPolicy.setDeleteRevisionRequired(id: string, val: boolean, options?: StoreManagerRequestOptions): Promise<void>
```

##### removeDeleteRevisionRequired

```ts
StoreManager#RevisionPolicy.removeDeleteRevisionRequired(id: string, options?: StoreManagerRequestOptions): Promise<void>
```

#### Blacklist

##### getIds

```ts
StoreManager#Blacklist.getIds(options?: StoreManagerRequestOptions): Promise<string[]>
```

##### add

```ts
StoreManager#Blacklist.add(id: string, options?: StoreManagerRequestOptions): Promise<void>
```

##### remove

```ts
StoreManager#Blacklist.remove(id: string, options?: StoreManagerRequestOptions): Promise<void>
```

#### Whitelist

##### getIds

```ts
StoreManager#Whitelist.getIds(options?: StoreManagerRequestOptions): Promise<string[]>
```

##### add

```ts
StoreManager#Whitelist.add(id: string, options?: StoreManagerRequestOptions): Promise<void>
```

##### remove

```ts
StoreManager#Whitelist.remove(id: string, options?: StoreManagerRequestOptions): Promise<void>
```

#### TokenPolicy

##### getIds

```ts
StoreManager#TokenPolicy.getIds(options?: StoreManagerRequestOptions): Promise<string[]>
```

##### get

```ts
StoreManager#TokenPolicy.get(id: string, options?: StoreManagerRequestOptions): Promise<{
  writeTokenRequired: boolean | null
  readTokenRequired: boolean | null
  deleteTokenRequired: boolean | null
}>
```

##### setWriteTokenRequired

```ts
StoreManager#TokenPolicy.setWriteTokenRequired(id: string, val: boolean, options?: StoreManagerRequestOptions): Promise<void>
```

##### removeWriteTokenRequired

```ts
StoreManager#TokenPolicy.removeWriteTokenRequired(id: string, options?: StoreManagerRequestOptions): Promise<void>
```

##### setReadTokenRequired


```ts
StoreManager#TokenPolicy.setReadTokenRequired(id: string, val: boolean, options?: StoreManagerRequestOptions): Promise<void>
```

##### removeReadTokenRequired

```ts
StoreManager#TokenPolicy.removeReadTokenRequired(id: string, options?: StoreManagerRequestOptions): Promise<void>
```

##### setDeleteTokenRequired

```ts
StoreManager#TokenPolicy.setDeleteTokenRequired(id: string, val: boolean, options?: StoreManagerRequestOptions): Promise<void>
```

##### removeDeleteTokenRequired

```ts
StoreManager#TokenPolicy.removeDeleteTokenRequired(id: string, options?: StoreManagerRequestOptions): Promise<void>
```

#### Token

##### getIds

```ts
StoreManager#Token.getIds(options?: StoreManagerRequestOptions): Promise<string[]>
```

##### getTokens

```ts
StoreManager#Token.getTokens(id: string, options?: StoreManagerRequestOptions): Promise<Array<{
  token: string
  write: boolean
  read: boolean
  delete: boolean
}>>
```

##### addWriteToken

```ts
StoreManager#Token.addWriteToken(id: string, token: string, options?: StoreManagerRequestOptions): Promise<void>
```

##### removeWriteToken

```ts
StoreManager#Token.removeWriteToken(id: string, token: string, options?: StoreManagerRequestOptions): Promise<void>
```

##### addReadToken

```ts
StoreManager#Token.addReadToken(id: string, token: string, options?: StoreManagerRequestOptions): Promise<void>
```

##### removeReadToken

```ts
StoreManager#Token.removeReadToken(id: string, token: string, options?: StoreManagerRequestOptions): Promise<void>
```

##### addDeleteToken

```ts
StoreManager#Token.addDeleteToken(id: string, token: string, options?: StoreManagerRequestOptions): Promise<void>
```

##### removeDeleteToken

```ts
StoreManager#Token.removeDeleteToken(id: string, token: string, options?: StoreManagerRequestOptions): Promise<void>
```
