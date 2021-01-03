import { fetch } from 'cross-fetch'
import { head, put, get, del } from 'extra-request'
import { url, pathname, json, text, searchParams, signal } from 'extra-request/lib/es2018/transformers'
import { NotFound } from '@blackglory/http-status'
import { ok, toJSON } from 'extra-response'

interface Item<T> {
  rev: string
  doc: T
}

interface Info {
  id: string
  items: number
}

export interface StoreClientOptions {
  server: string
  token?: string
}

export interface StoreClientRequestOptions {
  signal?: AbortSignal
  token?: string
}

export interface StoreClientRequestOptionsWithRevision extends StoreClientRequestOptions {
  rev?: string
}

export interface StoreClientRequestOptionsWithoutToken {
  signal?: AbortSignal
}

export class StoreClient {
  constructor(private options: StoreClientOptions) {}

  async set(
    storeId: string
  , itemId: string
  , doc: string
  , options: StoreClientRequestOptionsWithRevision = {}
  ): Promise<void> {
    const token = options.token ?? this.options.token
    const req = put(
      url(this.options.server)
    , pathname(`/store/${storeId}/items/${itemId}`)
    , token && searchParams({ token })
    , text(doc)
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }

  async setJSON<T>(
    storeId: string
  , itemId: string
  , doc: T
  , options: StoreClientRequestOptionsWithRevision = {}
  ): Promise<void> {
    const token = options.token ?? this.options.token
    const req = put(
      url(this.options.server)
    , pathname(`/store/${storeId}/items/${itemId}`)
    , token && searchParams({ token })
    , json(doc)
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
    const req = head(
      url(this.options.server)
    , pathname(`/store/${storeId}/items/${itemId}`)
    , token && searchParams({ token })
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
      rev: res.headers.get('ETag')!
    , doc: await res.text()
    }))
  }

  getJSON<T>(
    storeId: string
  , itemId: string
  , options?: StoreClientRequestOptionsWithRevision
  ): Promise<Item<T>> {
    return this._get(storeId, itemId, options).then(async res => ({
      rev: res.headers.get('ETag')!
    , doc: await res.json()
    }))
  }

  async _get(
    storeId: string
  , itemId: string
  , options: StoreClientRequestOptionsWithRevision = {}
  ): Promise<Response> {
    const token = options.token ?? this.options.token
    const req = get(
      url(this.options.server)
    , pathname(`/store/${storeId}/items/${itemId}`)
    , token && searchParams({ token })
    , options.signal && signal(options.signal)
    )

    return await fetch(req).then(ok)
  }

  async listItems(storeId: string, options: StoreClientRequestOptions = {}): Promise<string[]> {
    const token = options.token ?? this.options.token
    const req = get(
      url(this.options.server)
    , pathname(`/store/${storeId}/items`)
    , token && searchParams({ token })
    , options.signal && signal(options.signal)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as string[]
  }

  async del(
    storeId: string
  , itemId: string
  , options: StoreClientRequestOptionsWithRevision = {}
  ): Promise<void> {
    const token = options.token ?? this.options.token
    const req = del(
      url(this.options.server)
    , pathname(`/store/${storeId}/items/${itemId}`)
    , token && searchParams({ token })
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }

  async clear(
    storeId: string
  , options: StoreClientRequestOptions = {}
  ): Promise<void> {
    const token = options.token ?? this.options.token
    const req = del(
      url(this.options.server)
    , pathname(`/store/${storeId}`)
    , token && searchParams({ token })
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }

  async stats(storeId: string, options: StoreClientRequestOptionsWithoutToken = {}): Promise<Info> {
    const req = get(
      url(this.options.server)
    , pathname(`/store/${storeId}/stats`)
    , options.signal && signal(options.signal)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as Info
  }

  async listStores(options: StoreClientRequestOptionsWithoutToken = {}): Promise<string[]> {
    const req = get(
      url(this.options.server)
    , pathname(`/store`)
    , options.signal && signal(options.signal)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as string[]
  }
}
