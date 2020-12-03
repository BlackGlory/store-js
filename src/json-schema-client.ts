import { Json } from '@blackglory/types'
import { get, putJson, del } from './utils'

export interface JsonSchemaClientOptions {
  server: string
  adminPassword: string
}

export class JsonSchemaClient {
  constructor(private options: JsonSchemaClientOptions) {}

  async getIds(): Promise<string[]> {
    const res = await get({
      baseUrl: this.options.server
    , pathname: '/api/store-with-json-schema'
    , adminPassword: this.options.adminPassword
    })
    return await res.json()
  }

  async get(id: string): Promise<Json> {
    const res = await get({
      baseUrl: this.options.server
    , pathname: `/api/store/${id}/json-schema`
    , adminPassword: this.options.adminPassword
    })
    return await res.json()
  }

  async set(id: string, schema: Json): Promise<void> {
    await putJson({
      baseUrl: this.options.server
    , pathname: `/api/store/${id}/json-schema`
    , json: schema
    , adminPassword: this.options.adminPassword
    })
  }

  async remove(id: string): Promise<void> {
    await del({
      baseUrl: this.options.server
    , pathname: `/api/store/${id}/json-schema`
    , adminPassword: this.options.adminPassword
    })
  }
}
