import { fetch } from 'extra-fetch'
import { head, put, get, del } from 'extra-request'
import { url, pathname, json, text, csv, searchParams, signal, basicAuth } from 'extra-request/lib/es2018/transformers'
import { NotFound } from '@blackglory/http-status'
import { ok, toJSON, toCSV, toText } from 'extra-response'

interface IItem<T> {
  revision: string
  payload: T
}

interface IInfo {
  id: string
  items: number
}

export interface IStoreClientOptions {
  server: string
  token?: string
  basicAuth?: {
    username: string
    password: string
  }
}

export interface IStoreClientRequestOptions {
  signal?: AbortSignal
  token?: string
}

export interface IStoreClientRequestOptionsWithRevision extends IStoreClientRequestOptions {
  revision?: string
}

export interface IStoreClientRequestOptionsWithoutToken {
  signal?: AbortSignal
}

export class StoreClient {
  constructor(private options: IStoreClientOptions) {}

  async set(
    storeId: string
  , itemId: string
  , payload: string
  , options: IStoreClientRequestOptionsWithRevision = {}
  ): Promise<void> {
    const token = options.token ?? this.options.token
    const auth = this.options.basicAuth
    const req = put(
      url(this.options.server)
    , pathname(`/store/${storeId}/items/${itemId}`)
    , token && searchParams({ token })
    , auth && basicAuth(auth.username, auth.password)
    , text(payload)
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }

  async setJSON<T>(
    storeId: string
  , itemId: string
  , payload: T
  , options: IStoreClientRequestOptionsWithRevision = {}
  ): Promise<void> {
    const token = options.token ?? this.options.token
    const auth = this.options.basicAuth
    const req = put(
      url(this.options.server)
    , pathname(`/store/${storeId}/items/${itemId}`)
    , token && searchParams({ token })
    , auth && basicAuth(auth.username, auth.password)
    , json(payload)
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }

  async setCSV<T extends object>(
    storeId: string
  , itemId: string
  , payload: T[]
  , options: IStoreClientRequestOptionsWithRevision = {}
  ): Promise<void> {
    const token = options.token ?? this.options.token
    const auth = this.options.basicAuth
    const req = put(
      url(this.options.server)
    , pathname(`/store/${storeId}/items/${itemId}`)
    , token && searchParams({ token })
    , auth && basicAuth(auth.username, auth.password)
    , csv(payload)
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }

  async has(
    storeId: string
  , itemId: string
  , options: IStoreClientRequestOptionsWithRevision = {}
  ): Promise<boolean> {
    const token = options.token ?? this.options.token
    const auth = this.options.basicAuth
    const req = head(
      url(this.options.server)
    , pathname(`/store/${storeId}/items/${itemId}`)
    , token && searchParams({ token })
    , auth && basicAuth(auth.username, auth.password)
    , options.signal && signal(options.signal)
    )

    try {
      await fetch(req).then(ok)
      return true
    } catch (e) {
      if (e instanceof NotFound) return false
      throw e
    }
  }

  get(
    storeId: string
  , itemId: string
  , options?: IStoreClientRequestOptionsWithRevision
  ): Promise<IItem<string>> {
    return this._get(storeId, itemId, options).then(async res => ({
      revision: res.headers.get('ETag')!
    , payload: await toText(res)
    }))
  }

  getJSON<T>(
    storeId: string
  , itemId: string
  , options?: IStoreClientRequestOptionsWithRevision
  ): Promise<IItem<T>> {
    return this._get(storeId, itemId, options).then(async res => ({
      revision: res.headers.get('ETag')!
    , payload: await toJSON(res)
    }))
  }

  getCSV<T extends object>(
    storeId: string
  , itemId: string
  , options?: IStoreClientRequestOptionsWithRevision
  ): Promise<IItem<T[]>> {
    return this._get(storeId, itemId, options).then(async res => ({
      revision: res.headers.get('ETag')!
    , payload: await toCSV(res) as T[]
    }))
  }

  private async _get(
    storeId: string
  , itemId: string
  , options: IStoreClientRequestOptionsWithRevision = {}
  ): Promise<Response> {
    const token = options.token ?? this.options.token
    const auth = this.options.basicAuth
    const req = get(
      url(this.options.server)
    , pathname(`/store/${storeId}/items/${itemId}`)
    , token && searchParams({ token })
    , auth && basicAuth(auth.username, auth.password)
    , options.signal && signal(options.signal)
    )

    return await fetch(req).then(ok)
  }

  async del(
    storeId: string
  , itemId: string
  , options: IStoreClientRequestOptionsWithRevision = {}
  ): Promise<void> {
    const token = options.token ?? this.options.token
    const auth = this.options.basicAuth
    const req = del(
      url(this.options.server)
    , pathname(`/store/${storeId}/items/${itemId}`)
    , token && searchParams({ token })
    , auth && basicAuth(auth.username, auth.password)
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }

  async clear(
    storeId: string
  , options: IStoreClientRequestOptions = {}
  ): Promise<void> {
    const token = options.token ?? this.options.token
    const auth = this.options.basicAuth
    const req = del(
      url(this.options.server)
    , pathname(`/store/${storeId}`)
    , token && searchParams({ token })
    , auth && basicAuth(auth.username, auth.password)
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }

  async stats(storeId: string, options: IStoreClientRequestOptionsWithoutToken = {}): Promise<IInfo> {
    const auth = this.options.basicAuth
    const req = get(
      url(this.options.server)
    , pathname(`/store/${storeId}/stats`)
    , auth && basicAuth(auth.username, auth.password)
    , options.signal && signal(options.signal)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as IInfo
  }

  async getAllItemIds(storeId: string, options: IStoreClientRequestOptions = {}): Promise<string[]> {
    const token = options.token ?? this.options.token
    const auth = this.options.basicAuth
    const req = get(
      url(this.options.server)
    , pathname(`/store/${storeId}/items`)
    , token && searchParams({ token })
    , auth && basicAuth(auth.username, auth.password)
    , options.signal && signal(options.signal)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as string[]
  }

  async getAllStoreIds(options: IStoreClientRequestOptionsWithoutToken = {}): Promise<string[]> {
    const auth = this.options.basicAuth
    const req = get(
      url(this.options.server)
    , pathname('/store')
    , auth && basicAuth(auth.username, auth.password)
    , options.signal && signal(options.signal)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as string[]
  }
}
