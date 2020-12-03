import { head, putJson, get, del } from './utils'
import { NotFound } from '@blackglory/http-status'
import { Json } from '@blackglory/types'

export interface StoreClientOptions {
  server: string
  token?: string
}

export class StoreClient {
  constructor(private options: StoreClientOptions) {}

  async set(storeId: string, itemId: string, doc: Json, options: {
    rev?: string
    token?: string
  } = {}): Promise<string> {
    const token = options.token ?? this.options.token
    const res = await putJson({
      baseUrl: this.options.server
    , pathname: `/store/${storeId}/items/${itemId}`
    , querystring: token ? { token } : {}
    , json: doc
    })
    return res.headers.get('ETag')!
  }

  async has(storeId: string, itemId: string, options: {
    rev?: string
    token?: string
  } = {}): Promise<boolean> {
    const token = options.token ?? this.options.token
    try {
      await head({
        baseUrl: this.options.server
      , pathname: `/store/${storeId}/items/${itemId}`
      , querystring: token ? { token } : {}
      })
      return true
    } catch (e) {
      if (e instanceof NotFound) return false
      throw e
    }
  }

  async get(storeId: string, itemId: string, options: {
    rev?: string
    token?: string
  } = {}): Promise<{
    rev: string
    doc: Json
  }> {
    const token = options.token ?? this.options.token
    const res = await get({
      baseUrl: this.options.server
    , pathname: `/store/${storeId}/items/${itemId}`
    , querystring: token ? { token } : {}
    })
    return {
      rev: res.headers.get('ETag')!
    , doc: await res.json()
    }
  }

  async list(storeId: string, options: { token?: string } = {}): Promise<string[]> {
    const token = options.token ?? this.options.token
    const res = await get({
      baseUrl: this.options.server
    , pathname: `/store/${storeId}/items`
    , querystring: token ? { token } : {}
    })
    return res.json()
  }

  async remove(storeId: string, itemId: string, options: {
    rev?: string
    token?: string
  } = {}): Promise<void> {
    const token = options.token ?? this.options.token
    await del({
      baseUrl: this.options.server
    , pathname: `/store/${storeId}/items/${itemId}`
    , querystring: token ? { token } : {}
    })
  }
}
