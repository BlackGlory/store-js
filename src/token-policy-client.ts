import { get, putJson, del } from './utils'

export interface TokenPolicyClientOptions {
  server: string
  adminPassword: string
}

export class TokenPolicyClient {
  constructor(private options: TokenPolicyClientOptions) {}

  async getIds(): Promise<string[]> {
    const res = await get({
      baseUrl: this.options.server
    , pathname: '/api/store-with-token-policies'
    , adminPassword: this.options.adminPassword
    })
    return await res.json()
  }

  async get(id: string): Promise<{
    writeTokenRequired: boolean | null
    readTokenRequired: boolean | null
  }> {
    const res = await get({
      baseUrl: this.options.server
    , pathname: `/api/store/${id}/token-policies`
    , adminPassword: this.options.adminPassword
    })
    return await res.json()
  }

  async setWriteTokenRequired(id: string, val: boolean): Promise<void> {
    await putJson({
      baseUrl: this.options.server
    , pathname: `/api/store/${id}/token-policies/write-token-required`
    , adminPassword: this.options.adminPassword
    , json: val
    })
  }

  async removeWriteTokenRequired(id: string): Promise<void> {
    await del({
      baseUrl: this.options.server
    , pathname: `/api/store/${id}/token-policies/write-token-required`
    , adminPassword: this.options.adminPassword
    })
  }

  async setReadTokenRequired(id: string, val: boolean): Promise<void> {
    await putJson({
      baseUrl: this.options.server
    , pathname: `/api/store/${id}/token-policies/read-token-required`
    , adminPassword: this.options.adminPassword
    , json: val
    })
  }

  async removeReadTokenRequired(id: string): Promise<void> {
    await del({
      baseUrl: this.options.server
    , pathname: `/api/store/${id}/token-policies/read-token-required`
    , adminPassword: this.options.adminPassword
    })
  }

  async setDeleteTokenRequired(id: string, val: boolean): Promise<void> {
    await putJson({
      baseUrl: this.options.server
    , pathname: `/api/store/${id}/token-policies/delete-token-required`
    , adminPassword: this.options.adminPassword
    , json: val
    })
  }

  async removeDeleteTokenRequired(id: string): Promise<void> {
    await del({
      baseUrl: this.options.server
    , pathname: `/api/store/${id}/token-policies/delete-token-required`
    , adminPassword: this.options.adminPassword
    })
  }
}
