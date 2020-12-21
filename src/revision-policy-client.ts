import { fetch } from 'cross-fetch'
import { password } from './utils'
import { get, put, del } from 'extra-request'
import { url, pathname, json, signal } from 'extra-request/lib/es2018/transformers'
import { ok, toJSON } from 'extra-response'
import type { StoreManagerOptions } from './store-manager'
import { StoreManagerRequestOptions } from './types'

interface RevisionPolicy {
  updateRevisionRequired: boolean | null
  deleteRevisionRequired: boolean | null
}

export class RevisionPolicyClient {
  constructor(private options: StoreManagerOptions) {}

  async getIds(options: StoreManagerRequestOptions = {}): Promise<string[]> {
    const req = get(
      url(this.options.server)
    , pathname('/api/store-with-revision-policies')
    , password(this.options.adminPassword)
    , options.signal && signal(options.signal)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as string[]
  }

  async get(id: string, options: StoreManagerRequestOptions = {}): Promise<RevisionPolicy> {
    const req = get(
      url(this.options.server)
    , pathname(`/api/store/${id}/revision-policies`)
    , password(this.options.adminPassword)
    , options.signal && signal(options.signal)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as RevisionPolicy
  }

  async setUpdateRevisionRequired(id: string, val: boolean, options: StoreManagerRequestOptions = {}): Promise<void> {
    const req = put(
      url(this.options.server)
    , pathname(`/api/store/${id}/revision-policies/update-revision-required`)
    , password(this.options.adminPassword)
    , json(val)
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }

  async removeUpdateRevisionRequired(id: string, options: StoreManagerRequestOptions = {}): Promise<void> {
    const req = del(
      url(this.options.server)
    , pathname(`/api/store/${id}/revision-policies/update-revision-required`)
    , password(this.options.adminPassword)
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }

  async setDeleteRevisionRequired(id: string, val: boolean, options: StoreManagerRequestOptions = {}): Promise<void> {
    const req = put(
      url(this.options.server)
    , pathname(`/api/store/${id}/revision-policies/delete-revision-required`)
    , password(this.options.adminPassword)
    , json(val)
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }

  async removeDeleteRevisionRequired(id: string, options: StoreManagerRequestOptions = {}): Promise<void> {
    const req = del(
      url(this.options.server)
    , pathname(`/api/store/${id}/revision-policies/delete-revision-required`)
    , password(this.options.adminPassword)
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }
}
