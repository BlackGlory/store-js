# store-js

## Install

```sh
npm install --save @blackglory/store
# or
yarn add @blackglory/store
```

## API

### StoreClient

```ts
new StoreClient({
  server: string
, token?: string
})
```

#### set

```ts
StoreClient#set(storeId: string, itemId: string, doc: Json, options?: {
  rev?: string
  token?: string
}): Promise<string>
```

#### has

```ts
StoreClient#has(storeId: string, itemId: string, options?: {
  rev?: string
  token?: string
}): Promise<boolean>
```

#### get

```ts
StoreClient#get(storeId: string, itemId: string, options?: {
  rev?: string
  token?: string
}): Promise<{
  rev: string
  doc: Json
}>
```

#### list

```ts
StoreClient#list(storeId: string, options?: {
  token?: string
}): Promise<string[]>
```

#### remove

```ts
StoreClient#remove(storeId: string, itemId: string, options?: {
  rev?: string
  token?: string
}): Promise<void>
```

### StoreManager

```ts
new StoreManager({
  server: string
, adminPassword: string
})
```

#### JsonSchema

##### getIds

```ts
StoreManager#JsonSchema.getIds(): Promise<string[]>
```

##### get

```ts
StoreManager#JsonSchema.get(id: string): Promise<Json>
```

##### set

```ts
StoreManager#JsonSchema.set(id: string, schema: Json): Promise<void>
```

##### remove

```ts
StoreManager#JsonSchema.remove(id: string): Promise<void>
```

#### RevisionPolicy

##### getIds

```ts
StoreManager#RevisionPolicy.getIds(): Promise<string[]>
```

##### get

```ts
StoreManager#RevisionPolicy.get(id: string): Promise<{
  updateRevisionRequired: boolean | null
  deleteRevisionRequired: boolean | null
}>
```

##### setUpdateRevisionRequired

```ts
StoreManager#RevisionPolicy.setUpdateRevisionRequired(id: string, val: boolean): Promise<void>
```

##### removeUpdateRevisionRequired

```ts
StoreManager#RevisionPolicy.removeUpdateRevisionRequired(id: string): Promise<void>
```

##### setDeleteRevisionRequired

```ts
StoreManager#RevisionPolicy.setDeleteRevisionRequired(id: string, val: boolean): Promise<void>
```

##### removeDeleteRevisionRequired

```ts
StoreManager#RevisionPolicy.removeDeleteRevisionRequired(id: string): Promise<void>
```

#### Blacklist

##### getIds

```ts
StoreManager#Blacklist.getIds(): Promise<string[]>
```

##### add

```ts
StoreManager#Blacklist.add(id: string): Promise<void>
```

##### remove

```ts
StoreManager#Blacklist.remove(id: string): Promise<void>
```

#### Whitelist

##### getIds

```ts
StoreManager#Whitelist.getIds(): Promise<string[]>
```

##### add

```ts
StoreManager#Whitelist.add(id: string): Promise<void>
```

##### remove

```ts
StoreManager#Whitelist.remove(id: string): Promise<void>
```

#### TokenPolicy

##### getIds

```ts
StoreManager#TokenPolicy.getIds(): Promise<string[]>
```

##### get

```ts
StoreManager#TokenPolicy.get(id: string): Promise<{
  writeTokenRequired: boolean | null
  readTokenRequired: boolean | null
  deleteTokenRequired: boolean | null
}>
```

##### setWriteTokenRequired

```ts
StoreManager#TokenPolicy.setWriteTokenRequired(id: string, val: boolean): Promise<void>
```

##### removeWriteTokenRequired

```ts
StoreManager#TokenPolicy.removeWriteTokenRequired(id: string): Promise<void>
```

##### setReadTokenRequired


```ts
StoreManager#TokenPolicy.setReadTokenRequired(id: string, val: boolean): Promise<void>
```

##### removeReadTokenRequired

```ts
StoreManager#TokenPolicy.removeReadTokenRequired(id: string): Promise<void>
```

##### setDeleteTokenRequired

```ts
StoreManager#TokenPolicy.setDeleteTokenRequired(id: string, val: boolean): Promise<void>
```

##### removeDeleteTokenRequired

```ts
StoreManager#TokenPolicy.removeDeleteTokenRequired(id: string): Promise<void>
```

#### Token

##### getIds

```ts
StoreManager#Token.getIds(): Promise<string[]>
```

##### getTokens

```ts
StoreManager#Token.getTokens(id: string): Promise<Array<{
  token: string
  write: boolean
  read: boolean
  delete: boolean
}>>
```

##### addWriteToken

```ts
StoreManager#Token.addWriteToken(id: string, token: string): Promise<void>
```

##### removeWriteToken

```ts
StoreManager#Token.removeWriteToken(id: string, token: string): Promise<void>
```

##### addReadToken

```ts
StoreManager#Token.addReadToken(id: string, token: string): Promise<void>
```

##### removeReadToken

```ts
StoreManager#Token.removeReadToken(id: string, token: string): Promise<void>
```

##### addDeleteToken

```ts
StoreManager#Token.addDeleteToken(id: string, token: string): Promise<void>
```

##### removeDeleteToken

```ts
StoreManager#Token.removeDeleteToken(id: string, token: string): Promise<void>
```
