import { get, put, del } from './utils'

export interface BlacklistClientOptions {
  server: string
  adminPassword: string
}

export class BlacklistClient {
  constructor(private options: BlacklistClientOptions) {}

  async getIds(): Promise<string[]> {
    const res = await get({
      baseUrl: this.options.server
    , pathname: '/api/blacklist'
    , adminPassword: this.options.adminPassword
    })
    return await res.json()
  }

  async add(id: string): Promise<void> {
    await put({
      baseUrl: this.options.server
    , pathname: `/api/blacklist/${id}`
    , adminPassword: this.options.adminPassword
    })
  }

  async remove(id: string): Promise<void> {
    await del({
      baseUrl: this.options.server
    , pathname: `/api/blacklist/${id}`
    , adminPassword: this.options.adminPassword
    })
  }
}
