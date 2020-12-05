import { fetch } from 'cross-fetch'
import { head, put, get, del } from 'extra-request'
import { Json } from '@blackglory/types'
import { url, pathname, json, searchParams } from 'extra-request/lib/es2018/transformers'
import { NotFound } from '@blackglory/http-status'
import { checkHTTPStatus, toJSON } from './utils'

interface Item {
  rev: string
  doc: Json
}

export interface StoreClientOptions {
  server: string
  token?: string
}

export class StoreClient {
  constructor(private options: StoreClientOptions) {}

  async set(
    storeId: string
  , itemId: string
  , doc: Json
  , options: {
      rev?: string
      token?: string
    } = {}
  ): Promise<string> {
    const token = options.token ?? this.options.token
    const req = put(
      url(this.options.server)
    , pathname(`/store/${storeId}/items/${itemId}`)
    , token && searchParams({ token })
    , json(doc)
    )

    return await fetch(req)
      .then(checkHTTPStatus)
      .then(res => res.headers.get('ETag')!)
  }

  async has(
    storeId: string
  , itemId: string
  , options: {
      rev?: string
      token?: string
    } = {}
  ): Promise<boolean> {
    const token = options.token ?? this.options.token
    const req = head(
      url(this.options.server)
    , pathname(`/store/${storeId}/items/${itemId}`)
    , token && searchParams({ token })
    )

    try {
      await fetch(req)
        .then(checkHTTPStatus)
      return true
    } catch (e) {
      if (e instanceof NotFound) return false
      throw e
    }
  }

  async get(
    storeId: string
  , itemId: string
  , options: {
      rev?: string
      token?: string
    } = {}
  ): Promise<Item> {
    const token = options.token ?? this.options.token
    const req = get(
      url(this.options.server)
    , pathname(`/store/${storeId}/items/${itemId}`)
    , token && searchParams({ token })
    )

    return await fetch(req)
      .then(checkHTTPStatus)
      .then(async res => ({
        rev: res.headers.get('ETag')!
      , doc: await res.json()
      }))
  }

  async list(storeId: string, options: { token?: string } = {}): Promise<string[]> {
    const token = options.token ?? this.options.token
    const req = get(
      url(this.options.server)
    , pathname(`/store/${storeId}/items`)
    , token && searchParams({ token })
    )

    return await fetch(req)
      .then(checkHTTPStatus)
      .then(toJSON) as string[]
  }

  async del(
    storeId: string
  , itemId: string
  , options: {
      rev?: string
      token?: string
    } = {}
  ): Promise<void> {
    const token = options.token ?? this.options.token
    const req = del(
      url(this.options.server)
    , pathname(`/store/${storeId}/items/${itemId}`)
    , token && searchParams({ token })
    )

    await fetch(req)
      .then(checkHTTPStatus)
  }
}
