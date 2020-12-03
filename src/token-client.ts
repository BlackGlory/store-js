import { get, put, del } from './utils'

export interface TokenClientOptions {
  server: string
  adminPassword: string
}

export class TokenClient {
  constructor(private options: TokenClientOptions) {}

  async getIds(): Promise<string[]> {
    const res = await get({
      baseUrl: this.options.server
    , pathname: '/api/store-with-tokens'
    , adminPassword: this.options.adminPassword
    })
    return await res.json()
  }

  async getTokens(id: string): Promise<Array<{
    token: string
    write: boolean
    read: boolean
  }>> {
    const res = await get({
      baseUrl: this.options.server
    , pathname: `/api/store/${id}/tokens`
    , adminPassword: this.options.adminPassword
    })
    return await res.json()
  }

  async addWriteToken(id: string, token: string): Promise<void> {
    await put({
      baseUrl: this.options.server
    , pathname: `/api/store/${id}/tokens/${token}/write`
    , adminPassword: this.options.adminPassword
    })
  }

  async removeWriteToken(id: string, token: string): Promise<void> {
    await del({
      baseUrl: this.options.server
    , pathname: `/api/store/${id}/tokens/${token}/write`
    , adminPassword: this.options.adminPassword
    })
  }

  async addReadToken(id: string, token: string): Promise<void> {
    await put({
      baseUrl: this.options.server
    , pathname: `/api/store/${id}/tokens/${token}/read`
    , adminPassword: this.options.adminPassword
    })
  }

  async removeReadToken(id: string, token: string): Promise<void> {
    await del({
      baseUrl: this.options.server
    , pathname: `/api/store/${id}/tokens/${token}/read`
    , adminPassword: this.options.adminPassword
    })
  }
}
