import { fetch } from 'extra-fetch'
import { get, put, del } from 'extra-request'
import { pathname, json } from 'extra-request/transformers/index.js'
import { ok, toJSON } from 'extra-response'
import { IStoreManagerRequestOptions, StoreManagerBase } from './utils'

interface IRevisionPolicy {
  updateRevisionRequired: boolean | null
  deleteRevisionRequired: boolean | null
}

export class RevisionPolicyClient extends StoreManagerBase {
  async getNamespaces(options: IStoreManagerRequestOptions = {}): Promise<string[]> {
    const req = get(
      ...this.getCommonTransformers(options)
    , pathname('/admin/store-with-revision-policies')
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as string[]
  }

  async get(
    namespace: string
  , options: IStoreManagerRequestOptions = {}
  ): Promise<IRevisionPolicy> {
    const req = get(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/store/${namespace}/revision-policies`)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as IRevisionPolicy
  }

  async setUpdateRevisionRequired(
    namespace: string
  , val: boolean
  , options: IStoreManagerRequestOptions = {}
  ): Promise<void> {
    const req = put(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/store/${namespace}/revision-policies/update-revision-required`)
    , json(val)
    )

    await fetch(req).then(ok)
  }

  async removeUpdateRevisionRequired(
    namespace: string
  , options: IStoreManagerRequestOptions = {}
  ): Promise<void> {
    const req = del(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/store/${namespace}/revision-policies/update-revision-required`)
    )

    await fetch(req).then(ok)
  }

  async setDeleteRevisionRequired(
    namespace: string
  , val: boolean
  , options: IStoreManagerRequestOptions = {}
  ): Promise<void> {
    const req = put(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/store/${namespace}/revision-policies/delete-revision-required`)
    , json(val)
    )

    await fetch(req).then(ok)
  }

  async removeDeleteRevisionRequired(
    namespace: string
  , options: IStoreManagerRequestOptions = {}
  ): Promise<void> {
    const req = del(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/store/${namespace}/revision-policies/delete-revision-required`)
    )

    await fetch(req).then(ok)
  }
}
