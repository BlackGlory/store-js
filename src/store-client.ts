import { fetch } from 'extra-fetch'
import { head, put, get, del } from 'extra-request'
import { url, pathname, json, text, csv, searchParams, signal, basicAuth } from 'extra-request/lib/es2018/transformers'
import { NotFound } from '@blackglory/http-status'
import { ok, toJSON, toCSV, toText } from 'extra-response'

interface Item<T> {
  revision: string
  payload: T
}

interface Info {
  id: string
  items: number
}

export interface StoreClientOptions {
  server: string
  token?: string
  basicAuth?: {
    username: string
    password: string
  }
}

export interface StoreClientRequestOptions {
  signal?: AbortSignal
  token?: string
}

export interface StoreClientRequestOptionsWithRevision extends StoreClientRequestOptions {
  revision?: string
}

export interface StoreClientRequestOptionsWithoutToken {
  signal?: AbortSignal
}

export class StoreClient {
  constructor(private options: StoreClientOptions) {}

  async set(
    storeId: string
  , itemId: string
  , payload: string
  , options: StoreClientRequestOptionsWithRevision = {}
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
  , options: StoreClientRequestOptionsWithRevision = {}
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
  , options: StoreClientRequestOptionsWithRevision = {}
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
  , options: StoreClientRequestOptionsWithRevision = {}
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
  , options?: StoreClientRequestOptionsWithRevision
  ): Promise<Item<string>> {
    return this._get(storeId, itemId, options).then(async res => ({
      revision: res.headers.get('ETag')!
    , payload: await toText(res)
    }))
  }

  getJSON<T>(
    storeId: string
  , itemId: string
  , options?: StoreClientRequestOptionsWithRevision
  ): Promise<Item<T>> {
    return this._get(storeId, itemId, options).then(async res => ({
      revision: res.headers.get('ETag')!
    , payload: await toJSON(res)
    }))
  }

  getCSV<T extends object>(
    storeId: string
  , itemId: string
  , options?: StoreClientRequestOptionsWithRevision
  ): Promise<Item<T[]>> {
    return this._get(storeId, itemId, options).then(async res => ({
      revision: res.headers.get('ETag')!
    , payload: await toCSV(res) as T[]
    }))
  }

  private async _get(
    storeId: string
  , itemId: string
  , options: StoreClientRequestOptionsWithRevision = {}
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
  , options: StoreClientRequestOptionsWithRevision = {}
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
  , options: StoreClientRequestOptions = {}
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

  async stats(storeId: string, options: StoreClientRequestOptionsWithoutToken = {}): Promise<Info> {
    const auth = this.options.basicAuth
    const req = get(
      url(this.options.server)
    , pathname(`/store/${storeId}/stats`)
    , auth && basicAuth(auth.username, auth.password)
    , options.signal && signal(options.signal)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as Info
  }

  async getAllItemIds(storeId: string, options: StoreClientRequestOptions = {}): Promise<string[]> {
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

  async getAllStoreIds(options: StoreClientRequestOptionsWithoutToken = {}): Promise<string[]> {
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
