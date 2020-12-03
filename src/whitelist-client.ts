import { get, put, del } from './utils'

export interface WhitelistClientOptions {
  server: string
  adminPassword: string
}

export class WhitelistClient {
  constructor(private options: WhitelistClientOptions) {}

  async getIds(): Promise<string[]> {
    const res = await get({
      baseUrl: this.options.server
    , pathname: '/api/whitelist'
    , adminPassword: this.options.adminPassword
    })
    return await res.json()
  }

  async add(id: string): Promise<void> {
    await put({
      baseUrl: this.options.server
    , pathname: `/api/whitelist/${id}`
    , adminPassword: this.options.adminPassword
    })
  }

  async remove(id: string): Promise<void> {
    await del({
      baseUrl: this.options.server
    , pathname: `/api/whitelist/${id}`
    , adminPassword: this.options.adminPassword
    })
  }
}
