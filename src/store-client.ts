import { fetch } from 'extra-fetch'
import { head, put, get, del } from 'extra-request'
import { url, pathname, json, text, csv, searchParams, signal, basicAuth, keepalive } from 'extra-request/lib/es2018/transformers'
import { NotFound } from '@blackglory/http-status'
import { ok, toJSON, toCSV, toText } from 'extra-response'

export { HTTPClientError } from '@blackglory/http-status'

interface IItem<T> {
  revision: string
  payload: T
}

interface IInfo {
  namespace: string
  items: number
}

export interface IStoreClientOptions {
  server: string
  token?: string
  basicAuth?: {
    username: string
    password: string
  }
  keepalive?: boolean
}

export interface IStoreClientRequestOptions {
  signal?: AbortSignal
  token?: string
  keepalive?: boolean
}

export interface IStoreClientRequestOptionsWithRevision extends IStoreClientRequestOptions {
  revision?: string
}

export interface IStoreClientRequestOptionsWithoutToken {
  signal?: AbortSignal
  keepalive?: boolean
}

export class StoreClient {
  constructor(private options: IStoreClientOptions) {}

  async set(
    namespace: string
  , id: string
  , payload: string
  , options: IStoreClientRequestOptionsWithRevision = {}
  ): Promise<void> {
    const token = options.token ?? this.options.token
    const auth = this.options.basicAuth
    const req = put(
      url(this.options.server)
    , pathname(`/store/${namespace}/items/${id}`)
    , token && searchParams({ token })
    , auth && basicAuth(auth.username, auth.password)
    , text(payload)
    , options.signal && signal(options.signal)
    , keepalive(options.keepalive ?? this.options.keepalive)
    )

    await fetch(req).then(ok)
  }

  async setJSON<T>(
    namespace: string
  , id: string
  , payload: T
  , options: IStoreClientRequestOptionsWithRevision = {}
  ): Promise<void> {
    const token = options.token ?? this.options.token
    const auth = this.options.basicAuth
    const req = put(
      url(this.options.server)
    , pathname(`/store/${namespace}/items/${id}`)
    , token && searchParams({ token })
    , auth && basicAuth(auth.username, auth.password)
    , json(payload)
    , options.signal && signal(options.signal)
    , keepalive(options.keepalive ?? this.options.keepalive)
    )

    await fetch(req).then(ok)
  }

  async setCSV<T extends object>(
    namespace: string
  , id: string
  , payload: T[]
  , options: IStoreClientRequestOptionsWithRevision = {}
  ): Promise<void> {
    const token = options.token ?? this.options.token
    const auth = this.options.basicAuth
    const req = put(
      url(this.options.server)
    , pathname(`/store/${namespace}/items/${id}`)
    , token && searchParams({ token })
    , auth && basicAuth(auth.username, auth.password)
    , csv(payload)
    , options.signal && signal(options.signal)
    , keepalive(options.keepalive ?? this.options.keepalive)
    )

    await fetch(req).then(ok)
  }

  async has(
    namespace: string
  , id: string
  , options: IStoreClientRequestOptionsWithRevision = {}
  ): Promise<boolean> {
    const token = options.token ?? this.options.token
    const auth = this.options.basicAuth
    const req = head(
      url(this.options.server)
    , pathname(`/store/${namespace}/items/${id}`)
    , token && searchParams({ token })
    , auth && basicAuth(auth.username, auth.password)
    , options.signal && signal(options.signal)
    , keepalive(options.keepalive ?? this.options.keepalive)
    )

    try {
      await fetch(req).then(ok)
      return true
    } catch (e) {
      if (e instanceof NotFound) return false
      throw e
    }
  }

  /**
   * @throws {NotFound}
   */
  get(
    namespace: string
  , id: string
  , options?: IStoreClientRequestOptionsWithRevision
  ): Promise<IItem<string>> {
    return this._get(namespace, id, options).then(async res => ({
      revision: res.headers.get('ETag')!
    , payload: await toText(res)
    }))
  }

  /**
   * @throws {NotFound}
   */
  getJSON<T>(
    namespace: string
  , id: string
  , options?: IStoreClientRequestOptionsWithRevision
  ): Promise<IItem<T>> {
    return this._get(namespace, id, options).then(async res => ({
      revision: res.headers.get('ETag')!
    , payload: await toJSON(res)
    }))
  }

  /**
   * @throws {NotFound}
   */
  getCSV<T extends object>(
    namespace: string
  , id: string
  , options?: IStoreClientRequestOptionsWithRevision
  ): Promise<IItem<T[]>> {
    return this._get(namespace, id, options).then(async res => ({
      revision: res.headers.get('ETag')!
    , payload: await toCSV(res) as T[]
    }))
  }

  /**
   * @throws {NotFound}
   */
  private async _get(
    namespace: string
  , id: string
  , options: IStoreClientRequestOptionsWithRevision = {}
  ): Promise<Response> {
    const token = options.token ?? this.options.token
    const auth = this.options.basicAuth
    const req = get(
      url(this.options.server)
    , pathname(`/store/${namespace}/items/${id}`)
    , token && searchParams({ token })
    , auth && basicAuth(auth.username, auth.password)
    , options.signal && signal(options.signal)
    , keepalive(options.keepalive ?? this.options.keepalive)
    )

    return await fetch(req).then(ok)
  }

  async del(
    namespace: string
  , id: string
  , options: IStoreClientRequestOptionsWithRevision = {}
  ): Promise<void> {
    const token = options.token ?? this.options.token
    const auth = this.options.basicAuth
    const req = del(
      url(this.options.server)
    , pathname(`/store/${namespace}/items/${id}`)
    , token && searchParams({ token })
    , auth && basicAuth(auth.username, auth.password)
    , options.signal && signal(options.signal)
    , keepalive(options.keepalive ?? this.options.keepalive)
    )

    await fetch(req).then(ok)
  }

  async clear(
    namespace: string
  , options: IStoreClientRequestOptions = {}
  ): Promise<void> {
    const token = options.token ?? this.options.token
    const auth = this.options.basicAuth
    const req = del(
      url(this.options.server)
    , pathname(`/store/${namespace}`)
    , token && searchParams({ token })
    , auth && basicAuth(auth.username, auth.password)
    , options.signal && signal(options.signal)
    , keepalive(options.keepalive ?? this.options.keepalive)
    )

    await fetch(req).then(ok)
  }

  async stats(
    namespace: string
  , options: IStoreClientRequestOptionsWithoutToken = {}
  ): Promise<IInfo> {
    const auth = this.options.basicAuth
    const req = get(
      url(this.options.server)
    , pathname(`/store/${namespace}/stats`)
    , auth && basicAuth(auth.username, auth.password)
    , options.signal && signal(options.signal)
    , keepalive(options.keepalive ?? this.options.keepalive)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as IInfo
  }

  async getAllItemIds(
    namespace: string
  , options: IStoreClientRequestOptions = {}
  ): Promise<string[]> {
    const token = options.token ?? this.options.token
    const auth = this.options.basicAuth
    const req = get(
      url(this.options.server)
    , pathname(`/store/${namespace}/items`)
    , token && searchParams({ token })
    , auth && basicAuth(auth.username, auth.password)
    , options.signal && signal(options.signal)
    , keepalive(options.keepalive ?? this.options.keepalive)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as string[]
  }

  async getAllNamespaces(
    options: IStoreClientRequestOptionsWithoutToken = {}
  ): Promise<string[]> {
    const auth = this.options.basicAuth
    const req = get(
      url(this.options.server)
    , pathname('/store')
    , auth && basicAuth(auth.username, auth.password)
    , options.signal && signal(options.signal)
    , keepalive(options.keepalive ?? this.options.keepalive)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as string[]
  }
}
