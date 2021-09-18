import { fetch } from 'extra-fetch'
import { get, put, del } from 'extra-request'
import { pathname, json } from 'extra-request/transformers/index.js'
import { ok, toJSON } from 'extra-response'
import { IStoreManagerRequestOptions, StoreManagerBase } from './utils'

interface ITokenPolicy {
  writeTokenRequired: boolean | null
  readTokenRequired: boolean | null
  deleteTokenRequired: boolean | null
}

export class TokenPolicyClient extends StoreManagerBase {
  async getNamespaces(options: IStoreManagerRequestOptions = {}): Promise<string[]> {
    const req = get(
      ...this.getCommonTransformers(options)
    , pathname('/admin/store-with-token-policies')
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as string[]
  }

  async get(namespace: string, options: IStoreManagerRequestOptions = {}): Promise<ITokenPolicy> {
    const req = get(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/store/${namespace}/token-policies`)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as ITokenPolicy
  }

  async setWriteTokenRequired(
    namespace: string
  , val: boolean
  , options: IStoreManagerRequestOptions = {}
  ): Promise<void> {
    const req = put(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/store/${namespace}/token-policies/write-token-required`)
    , json(val)
    )

    await fetch(req).then(ok)
  }

  async removeWriteTokenRequired(
    namespace: string
  , options: IStoreManagerRequestOptions = {}
  ): Promise<void> {
    const req = del(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/store/${namespace}/token-policies/write-token-required`)
    )

    await fetch(req).then(ok)
  }

  async setReadTokenRequired(
    namespace: string
  , val: boolean
  , options: IStoreManagerRequestOptions = {}
  ): Promise<void> {
    const req = put(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/store/${namespace}/token-policies/read-token-required`)
    , json(val)
    )

    await fetch(req).then(ok)
  }

  async removeReadTokenRequired(
    namespace: string
  , options: IStoreManagerRequestOptions = {}
  ): Promise<void> {
    const req = del(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/store/${namespace}/token-policies/read-token-required`)
    )

    await fetch(req).then(ok)
  }

  async setDeleteTokenRequired(
    namespace: string
  , val: boolean
  , options: IStoreManagerRequestOptions = {}
  ): Promise<void> {
    const req = put(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/store/${namespace}/token-policies/delete-token-required`)
    , json(val)
    )

    await fetch(req).then(ok)
  }

  async removeDeleteTokenRequired(
    namespace: string
  , options: IStoreManagerRequestOptions = {}
  ): Promise<void> {
    const req = del(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/store/${namespace}/token-policies/delete-token-required`)
    )

    await fetch(req).then(ok)
  }
}
