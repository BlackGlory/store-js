import { fetch } from 'cross-fetch'
import { password } from './utils'
import { get, put, del } from 'extra-request'
import { url, pathname, json } from 'extra-request/lib/es2018/transformers'
import { ok, toJSON } from 'extra-response'

interface RevisionPolicy {
  updateRevisionRequired: boolean | null
  deleteRevisionRequired: boolean | null
}

export interface RevisionPolicyClientOptions {
  server: string
  adminPassword: string
}

export class RevisionPolicyClient {
  constructor(private options: RevisionPolicyClientOptions) {}

  async getIds(): Promise<string[]> {
    const req = get(
      url(this.options.server)
    , pathname('/api/store-with-revision-policies')
    , password(this.options.adminPassword)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as string[]
  }

  async get(id: string): Promise<RevisionPolicy> {
    const req = get(
      url(this.options.server)
    , pathname(`/api/store/${id}/revision-policies`)
    , password(this.options.adminPassword)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as RevisionPolicy
  }

  async setUpdateRevisionRequired(id: string, val: boolean): Promise<void> {
    const req = put(
      url(this.options.server)
    , pathname(`/api/store/${id}/revision-policies/update-revision-required`)
    , password(this.options.adminPassword)
    , json(val)
    )

    await fetch(req).then(ok)
  }

  async removeUpdateRevisionRequired(id: string): Promise<void> {
    const req = del(
      url(this.options.server)
    , pathname(`/api/store/${id}/revision-policies/update-revision-required`)
    , password(this.options.adminPassword)
    )

    await fetch(req).then(ok)
  }

  async setDeleteRevisionRequired(id: string, val: boolean): Promise<void> {
    const req = put(
      url(this.options.server)
    , pathname(`/api/store/${id}/revision-policies/delete-revision-required`)
    , password(this.options.adminPassword)
    , json(val)
    )

    await fetch(req).then(ok)
  }

  async removeDeleteRevisionRequired(id: string): Promise<void> {
    const req = del(
      url(this.options.server)
    , pathname(`/api/store/${id}/revision-policies/delete-revision-required`)
    , password(this.options.adminPassword)
    )

    await fetch(req).then(ok)
  }
}
