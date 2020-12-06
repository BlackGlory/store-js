import { fetch } from 'cross-fetch'
import { password } from './utils'
import { get, put, del } from 'extra-request'
import { url, pathname, json } from 'extra-request/lib/es2018/transformers'
import { ok, toJSON } from 'extra-response'

interface TokenPolicy {
  writeTokenRequired: boolean | null
  readTokenRequired: boolean | null
  deleteTokenRequired: boolean | null
}

export interface TokenPolicyClientOptions {
  server: string
  adminPassword: string
}

export class TokenPolicyClient {
  constructor(private options: TokenPolicyClientOptions) {}

  async getIds(): Promise<string[]> {
    const req = get(
      url(this.options.server)
    , pathname('/api/store-with-token-policies')
    , password(this.options.adminPassword)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as string[]
  }

  async get(id: string): Promise<TokenPolicy> {
    const req = get(
      url(this.options.server)
    , pathname(`/api/store/${id}/token-policies`)
    , password(this.options.adminPassword)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as TokenPolicy
  }

  async setWriteTokenRequired(id: string, val: boolean): Promise<void> {
    const req = put(
      url(this.options.server)
    , pathname(`/api/store/${id}/token-policies/write-token-required`)
    , password(this.options.adminPassword)
    , json(val)
    )

    await fetch(req).then(ok)
  }

  async removeWriteTokenRequired(id: string): Promise<void> {
    const req = del(
      url(this.options.server)
    , pathname(`/api/store/${id}/token-policies/write-token-required`)
    , password(this.options.adminPassword)
    )

    await fetch(req).then(ok)
  }

  async setReadTokenRequired(id: string, val: boolean): Promise<void> {
    const req = put(
      url(this.options.server)
    , pathname(`/api/store/${id}/token-policies/read-token-required`)
    , password(this.options.adminPassword)
    , json(val)
    )

    await fetch(req).then(ok)
  }

  async removeReadTokenRequired(id: string): Promise<void> {
    const req = del(
      url(this.options.server)
    , pathname(`/api/store/${id}/token-policies/read-token-required`)
    , password(this.options.adminPassword)
    )

    await fetch(req).then(ok)
  }

  async setDeleteTokenRequired(id: string, val: boolean): Promise<void> {
    const req = put(
      url(this.options.server)
    , pathname(`/api/store/${id}/token-policies/delete-token-required`)
    , password(this.options.adminPassword)
    , json(val)
    )

    await fetch(req).then(ok)
  }

  async removeDeleteTokenRequired(id: string): Promise<void> {
    const req = del(
      url(this.options.server)
    , pathname(`/api/store/${id}/token-policies/delete-token-required`)
    , password(this.options.adminPassword)
    )

    await fetch(req).then(ok)
  }
}
