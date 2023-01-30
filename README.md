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
  token?: string
  basicAuth?: {
    username: string
    password: string
  }
  keepalive?: boolean
  timeout?: number
}

interface IStoreClientRequestOptions {
  signal?: AbortSignal
  token?: string
  keepalive?: boolean
  timeout?: number | false
}

interface IStoreClientRequestOptionsWithRevision extends IStoreClientRequestOptions {
  revision?: string
}

interface IStoreClientRequestOptionsWithoutToken {
  signal?: AbortSignal
  keepalive?: boolean
  timeout?: number | false
}

class StoreClient {
  constructor(options: IStoreClientOptions)

  set(
    namespace: string
  , id: string
  , payload: string
  , options: IStoreClientRequestOptionsWithRevision = {}
  ): Promise<void>

  setJSON<T>(
    namespace: string
  , id: string
  , payload: T
  , options: IStoreClientRequestOptionsWithRevision = {}
  ): Promise<void>

  setCSV<T extends object>(
    namespace: string
  , id: string
  , payload: T[]
  , options: IStoreClientRequestOptionsWithRevision = {}
  ): Promise<void>

  has(
    namespace: string
  , id: string
  , options: IStoreClientRequestOptionsWithRevision = {}
  ): Promise<boolean>

  get(
    namespace: string
  , id: string
  , options?: IStoreClientRequestOptionsWithRevision
  ): Promise<IItem<string> | undefined>

  getJSON<T>(
    namespace: string
  , id: string
  , options?: IStoreClientRequestOptionsWithRevision
  ): Promise<IItem<T> | undefined>

  del(
    namespace: string
  , id: string
  , options: IStoreClientRequestOptionsWithRevision = {}
  ): Promise<void>

  clear(
    namespace: string
  , options: IStoreClientRequestOptions = {}
  ): Promise<void>

  stats(
    namespace: string
  , options: IStoreClientRequestOptionsWithoutToken = {}
  ): Promise<IInfo>

  getAllItemIds(
    namespace: string
  , options: IStoreClientRequestOptions = {}
  ): Promise<string[]>

  getAllNamespaces(
    options: IStoreClientRequestOptionsWithoutToken = {}
  ): Promise<string[]>
}
```

### StoreManager
```ts
interface IStoreManagerRequestOptions {
  signal?: AbortSignal
  keepalive?: boolean
  timeout?: number | false
}

interface IStoreManagerRequestOptions {
  signal?: AbortSignal
  keepalive?: boolean
  timeout?: number | false
}

class StoreManager {
  constructor(options: IStoreManagerOptions)

  JsonSchema: JsonSchemaManager
  Blacklist: BlacklistManager
  Whitelist: WhitelistManager
  TokenPolicy: TokenPolicyManager
  Token: TokenManager
  RevisionPolicy: RevisionPolicyManager
}
```

#### JsonSchemaManager
```ts
class JsonSchemaManager {
  getNamespaces(options: IStoreManagerRequestOptions = {}): Promise<string[]>
  get(namespace: string, options: IStoreManagerRequestOptions = {}): Promise<unknown>
  set(
    namespace: string
  , schema: JSONValue
  , options: IStoreManagerRequestOptions = {}
  ): Promise<void>
  async remove(
    namespace: string
  , options: IStoreManagerRequestOptions = {}
  ): Promise<void>
}
```

#### BlacklistManager
```ts
class BlacklistManager {
  getNamespaces(options: IStoreManagerRequestOptions = {}): Promise<string[]>
  add(namespace: string, options: IStoreManagerRequestOptions = {}): Promise<void>
  remove(namespace: string, options: IStoreManagerRequestOptions = {}): Promise<void>
}
```

#### WhitelistManager
```ts
class WhitelistManager {
  getNamespaces(options: IStoreManagerRequestOptions = {}): Promise<string[]>
  add(namespace: string, options: IStoreManagerRequestOptions = {}): Promise<void>
  remove(namespace: string, options: IStoreManagerRequestOptions = {}): Promise<void>
}
```

#### TokenPolicyManager
```ts
interface ITokenPolicy {
  writeTokenRequired: boolean | null
  readTokenRequired: boolean | null
  deleteTokenRequired: boolean | null
}

class TokenPolicyManager {
  getNamespaces(options: IStoreManagerRequestOptions = {}): Promise<string[]>
  get(
    namespace: string
  , options: IStoreManagerRequestOptions = {}
  ): Promise<ITokenPolicy>
  setWriteTokenRequired(
    namespace: string
  , val: boolean
  , options: IStoreManagerRequestOptions = {}
  ): Promise<void>
  removeWriteTokenRequired(
    namespace: string
  , options: IStoreManagerRequestOptions = {}
  ): Promise<void>
  setReadTokenRequired(
    namespace: string
  , val: boolean
  , options: IStoreManagerRequestOptions = {}
  ): Promise<void>
  removeReadTokenRequired(
    namespace: string
  , options: IStoreManagerRequestOptions = {}
  ): Promise<void>
  setDeleteTokenRequired(
    namespace: string
  , val: boolean
  , options: IStoreManagerRequestOptions = {}
  ): Promise<void>
  removeDeleteTokenRequired(
    namespace: string
  , options: IStoreManagerRequestOptions = {}
  ): Promise<void>
}
```

#### TokenManager
```ts
interface ITokenInfo {
  token: string
  write: boolean
  read: boolean
  delete: boolean
}

class TokenManager {
  getNamespaces(options: IStoreManagerRequestOptions = {}): Promise<string[]>
  getTokens(
    namespace: string
  , options: IStoreManagerRequestOptions = {}
  ): Promise<ITokenInfo[]>
  addWriteToken(
    namespace: string
  , token: string
  , options: IStoreManagerRequestOptions = {}
  ): Promise<void>
  removeWriteToken(
    namespace: string
  , token: string
  , options: IStoreManagerRequestOptions = {}
  ): Promise<void>
  addReadToken(
    namespace: string
  , token: string
  , options: IStoreManagerRequestOptions = {}
  ): Promise<void>
  removeReadToken(
    namespace: string
  , token: string
  , options: IStoreManagerRequestOptions = {}
  ): Promise<void>
  addDeleteToken(
    namespace: string
  , token: string
  , options: IStoreManagerRequestOptions = {}
  ): Promise<void>
  removeDeleteToken(
    namespace: string
  , token: string
  , options: IStoreManagerRequestOptions = {}
  ): Promise<void>
}
```

#### RevisionPolicyManager
```ts
interface IRevisionPolicy {
  updateRevisionRequired: boolean | null
  deleteRevisionRequired: boolean | null
}

class RevisionPolicyManager {
  getNamespaces(options: IStoreManagerRequestOptions = {}): Promise<string[]>
  get(
    namespace: string
  , options: IStoreManagerRequestOptions = {}
  ): Promise<IRevisionPolicy>
  setUpdateRevisionRequired(
    namespace: string
  , val: boolean
  , options: IStoreManagerRequestOptions = {}
  ): Promise<void>
  removeUpdateRevisionRequired(
    namespace: string
  , options: IStoreManagerRequestOptions = {}
  ): Promise<void>
  setDeleteRevisionRequired(
    namespace: string
  , val: boolean
  , options: IStoreManagerRequestOptions = {}
  ): Promise<void>
  removeDeleteRevisionRequired(
    namespace: string
  , options: IStoreManagerRequestOptions = {}
  ): Promise<void>
}
```
