import { fetch } from 'extra-fetch'
import { head, put, get, del, IRequestOptionsTransformer } from 'extra-request'
import { url, appendPathname, json, text, csv, searchParams, signal, basicAuth, keepalive, header } from 'extra-request/transformers'
import { NotFound } from '@blackglory/http-status'
import { ok, toJSON, toText } from 'extra-response'
import { Falsy } from '@blackglory/prelude'
import { raceAbortSignals, timeoutSignal } from 'extra-abort'
import { expectedVersion } from './utils.js'

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
  timeout?: number
}

export interface IStoreClientRequestOptions {
  signal?: AbortSignal
  token?: string
  keepalive?: boolean
  timeout?: number | false
}

export interface IStoreClientRequestOptionsWithRevision extends IStoreClientRequestOptions {
  revision?: string
}

export interface IStoreClientRequestOptionsWithoutToken {
  signal?: AbortSignal
  keepalive?: boolean
  timeout?: number | false
}

export class StoreClient {
  constructor(private options: IStoreClientOptions) {}

  private getCommonTransformers(
    options: IStoreClientRequestOptions | IStoreClientRequestOptionsWithoutToken
  ): Array<IRequestOptionsTransformer | Falsy> {
    const token = 'token' in options
                  ? (options.token ?? this.options.token)
                  : this.options.token
    const auth = this.options.basicAuth

    return [
      url(this.options.server)
    , auth && basicAuth(auth.username, auth.password)
    , token && searchParams({ token })
    , signal(raceAbortSignals([
        options.signal
      , options.timeout !== false && (
          (options.timeout && timeoutSignal(options.timeout)) ??
          (this.options.timeout && timeoutSignal(this.options.timeout))
        )
      ]))
    , (options.keepalive ?? this.options.keepalive) && keepalive()
    , header('Accept-Version', expectedVersion)
    ]
  }

  /**
   * @throws {AbortError}
   */
  async set(
    namespace: string
  , id: string
  , payload: string
  , options: IStoreClientRequestOptionsWithRevision = {}
  ): Promise<void> {
    const req = put(
      ...this.getCommonTransformers(options)
    , appendPathname(`/store/${namespace}/items/${id}`)
    , text(payload)
    )

    await fetch(req).then(ok)
  }

  /**
   * @throws {AbortError}
   */
  async setJSON<T>(
    namespace: string
  , id: string
  , payload: T
  , options: IStoreClientRequestOptionsWithRevision = {}
  ): Promise<void> {
    const req = put(
      ...this.getCommonTransformers(options)
    , appendPathname(`/store/${namespace}/items/${id}`)
    , json(payload)
    )

    await fetch(req).then(ok)
  }

  /**
   * @throws {AbortError}
   */
  async setCSV<T extends object>(
    namespace: string
  , id: string
  , payload: T[]
  , options: IStoreClientRequestOptionsWithRevision = {}
  ): Promise<void> {
    const req = put(
      ...this.getCommonTransformers(options)
    , appendPathname(`/store/${namespace}/items/${id}`)
    , csv(payload)
    )

    await fetch(req).then(ok)
  }

  /**
   * @throws {AbortError}
   */
  async has(
    namespace: string
  , id: string
  , options: IStoreClientRequestOptionsWithRevision = {}
  ): Promise<boolean> {
    const req = head(
      ...this.getCommonTransformers(options)
    , appendPathname(`/store/${namespace}/items/${id}`)
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
   * @throws {AbortError}
   */
  async get(
    namespace: string
  , id: string
  , options?: IStoreClientRequestOptionsWithRevision
  ): Promise<IItem<string> | undefined> {
    try {
      return await this._get(namespace, id, options).then(async res => ({
        revision: res.headers.get('ETag')!
      , payload: await toText(res)
      }))
    } catch (e) {
      if (e instanceof NotFound) return undefined
      throw e
    }
  }

  /**
   * @throws {AbortError}
   */
  async getJSON<T>(
    namespace: string
  , id: string
  , options?: IStoreClientRequestOptionsWithRevision
  ): Promise<IItem<T> | undefined> {
    try {
      return await this._get(namespace, id, options).then(async res => ({
        revision: res.headers.get('ETag')!
      , payload: await toJSON(res)
      }))
    } catch (e) {
      if (e instanceof NotFound) return undefined
      throw e
    }
  }

  /**
   * @throws {NotFound}
   */
  private async _get(
    namespace: string
  , id: string
  , options: IStoreClientRequestOptionsWithRevision = {}
  ): Promise<Response> {
    const req = get(
      ...this.getCommonTransformers(options)
    , appendPathname(`/store/${namespace}/items/${id}`)
    )

    return await fetch(req).then(ok)
  }

  /**
   * @throws {AbortError}
   */
  async del(
    namespace: string
  , id: string
  , options: IStoreClientRequestOptionsWithRevision = {}
  ): Promise<void> {
    const req = del(
      ...this.getCommonTransformers(options)
    , appendPathname(`/store/${namespace}/items/${id}`)
    )

    await fetch(req).then(ok)
  }

  /**
   * @throws {AbortError}
   */
  async clear(
    namespace: string
  , options: IStoreClientRequestOptions = {}
  ): Promise<void> {
    const req = del(
      ...this.getCommonTransformers(options)
    , appendPathname(`/store/${namespace}`)
    )

    await fetch(req).then(ok)
  }

  /**
   * @throws {AbortError}
   */
  async stats(
    namespace: string
  , options: IStoreClientRequestOptionsWithoutToken = {}
  ): Promise<IInfo> {
    const req = get(
      ...this.getCommonTransformers(options)
    , appendPathname(`/store/${namespace}/stats`)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as IInfo
  }

  /**
   * @throws {AbortError}
   */
  async getAllItemIds(
    namespace: string
  , options: IStoreClientRequestOptions = {}
  ): Promise<string[]> {
    const req = get(
      ...this.getCommonTransformers(options)
    , appendPathname(`/store/${namespace}/items`)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as string[]
  }

  /**
   * @throws {AbortError}
   */
  async getAllNamespaces(
    options: IStoreClientRequestOptionsWithoutToken = {}
  ): Promise<string[]> {
    const req = get(
      ...this.getCommonTransformers(options)
    , appendPathname('/store')
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as string[]
  }
}
