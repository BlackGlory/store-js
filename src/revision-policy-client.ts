import { fetch } from 'extra-fetch'
import { password } from './utils'
import { get, put, del } from 'extra-request'
import { url, pathname, json, signal } from 'extra-request/lib/es2018/transformers'
import { ok, toJSON } from 'extra-response'
import type { IStoreManagerOptions } from './store-manager'
import { IStoreManagerRequestOptions } from './types'

interface IRevisionPolicy {
  updateRevisionRequired: boolean | null
  deleteRevisionRequired: boolean | null
}

export class RevisionPolicyClient {
  constructor(private options: IStoreManagerOptions) {}

  async getIds(options: IStoreManagerRequestOptions = {}): Promise<string[]> {
    const req = get(
      url(this.options.server)
    , pathname('/admin/store-with-revision-policies')
    , password(this.options.adminPassword)
    , options.signal && signal(options.signal)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as string[]
  }

  async get(id: string, options: IStoreManagerRequestOptions = {}): Promise<IRevisionPolicy> {
    const req = get(
      url(this.options.server)
    , pathname(`/admin/store/${id}/revision-policies`)
    , password(this.options.adminPassword)
    , options.signal && signal(options.signal)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as IRevisionPolicy
  }

  async setUpdateRevisionRequired(id: string, val: boolean, options: IStoreManagerRequestOptions = {}): Promise<void> {
    const req = put(
      url(this.options.server)
    , pathname(`/admin/store/${id}/revision-policies/update-revision-required`)
    , password(this.options.adminPassword)
    , json(val)
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }

  async removeUpdateRevisionRequired(id: string, options: IStoreManagerRequestOptions = {}): Promise<void> {
    const req = del(
      url(this.options.server)
    , pathname(`/admin/store/${id}/revision-policies/update-revision-required`)
    , password(this.options.adminPassword)
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }

  async setDeleteRevisionRequired(id: string, val: boolean, options: IStoreManagerRequestOptions = {}): Promise<void> {
    const req = put(
      url(this.options.server)
    , pathname(`/admin/store/${id}/revision-policies/delete-revision-required`)
    , password(this.options.adminPassword)
    , json(val)
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }

  async removeDeleteRevisionRequired(id: string, options: IStoreManagerRequestOptions = {}): Promise<void> {
    const req = del(
      url(this.options.server)
    , pathname(`/admin/store/${id}/revision-policies/delete-revision-required`)
    , password(this.options.adminPassword)
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }
}
