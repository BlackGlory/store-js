import { get, putJson, del } from './utils'

export interface RevisionPolicyClientOptions {
  server: string
  adminPassword: string
}

export class RevisionPolicyClient {
  constructor(private options: RevisionPolicyClientOptions) {}

  async getIds(): Promise<string[]> {
    const res = await get({
      baseUrl: this.options.server
    , pathname: '/api/store-with-revision-policies'
    , adminPassword: this.options.adminPassword
    })
    return await res.json()
  }

  async get(id: string): Promise<{
    updateRevisionRequired: boolean | null
    deleteRevisionRequired: boolean | null
  }> {
    const res = await get({
      baseUrl: this.options.server
    , pathname: `/api/store/${id}/revision-policies`
    , adminPassword: this.options.adminPassword
    })
    return await res.json()
  }

  async setUpdateRevisionRequired(id: string, val: boolean): Promise<void> {
    await putJson({
      baseUrl: this.options.server
    , pathname: `/api/store/${id}/revision-policies/update-revision-required`
    , json: val
    , adminPassword: this.options.adminPassword
    })
  }

  async removeUpdateRevisionRequired(id: string): Promise<void> {
    await del({
      baseUrl: this.options.server
    , pathname: `/api/store/${id}/revision-policies/update-revision-required`
    , adminPassword: this.options.adminPassword
    })
  }

  async setDeleteRevisionRequired(id: string, val: boolean): Promise<void> {
    await putJson({
      baseUrl: this.options.server
    , pathname: `/api/store/${id}/revision-policies/delete-revision-required`
    , json: val
    , adminPassword: this.options.adminPassword
    })
  }

  async removeDeleteRevisionRequired(id: string): Promise<void> {
    await del({
      baseUrl: this.options.server
    , pathname: `/api/store/${id}/revision-policies/delete-revision-required`
    , adminPassword: this.options.adminPassword
    })
  }
}
