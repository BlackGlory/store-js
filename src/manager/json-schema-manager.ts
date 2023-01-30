import { fetch } from 'extra-fetch'
import { JSONValue } from '@blackglory/prelude'
import { get, put, del } from 'extra-request'
import { appendPathname, json } from 'extra-request/transformers'
import { ok, toJSON } from 'extra-response'
import { IStoreManagerRequestOptions, Base } from './base.js'

export class JsonSchemaManager extends Base {
  /**
   * @throws {AbortError}
   */
  async getNamespaces(options: IStoreManagerRequestOptions = {}): Promise<string[]> {
    const req = get(
      ...this.getCommonTransformers(options)
    , appendPathname('/admin/store-with-json-schema')
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as string[]
  }

  /**
   * @throws {AbortError}
   */
  async get(
    namespace: string
  , options: IStoreManagerRequestOptions = {}
  ): Promise<unknown> {
    const req = get(
      ...this.getCommonTransformers(options)
    , appendPathname(`/admin/store/${namespace}/json-schema`)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON)
  }

  /**
   * @throws {AbortError}
   */
  async set(
    namespace: string
  , schema: JSONValue
  , options: IStoreManagerRequestOptions = {}
  ): Promise<void> {
    const req = put(
      ...this.getCommonTransformers(options)
    , appendPathname(`/admin/store/${namespace}/json-schema`)
    , json(schema)
    )

    await fetch(req).then(ok)
  }

  /**
   * @throws {AbortError}
   */
  async remove(
    namespace: string
  , options: IStoreManagerRequestOptions = {}
  ): Promise<void> {
    const req = del(
      ...this.getCommonTransformers(options)
    , appendPathname(`/admin/store/${namespace}/json-schema`)
    )

    await fetch(req).then(ok)
  }
}
