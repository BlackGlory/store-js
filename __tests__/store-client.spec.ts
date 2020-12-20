import { server } from '@test/store.mock'
import { StoreClient } from '@src/store-client'
import { TOKEN } from '@test/utils'
import '@blackglory/jest-matchers'
import 'jest-extended'

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
beforeEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('StoreClient', () => {
  it('set(storeId: string, itemId: string, doc: string, options?: { rev?: string; token?: string }): Promise<string>', async () => {
    const client = createClient()
    const storeId = 'store-id'
    const itemId = 'item-id'
    const doc = 'message'

    const result = client.set(storeId, itemId, doc)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBe('revision')
  })

  it('setJSON(storeId: string, itemId: string, doc: Json, options?: { rev?: string; token?: string }): Promise<string>', async () => {
    const client = createClient()
    const storeId = 'store-id'
    const itemId = 'item-id'
    const doc = { message: 'message' }

    const result = client.setJSON(storeId, itemId, doc)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBe('revision')
  })

  it('has(storeId, string, itemId: string, options?: { rev?: string; token?: string }): Promise<boolean>', async () => {
    const client = createClient()
    const storeId = 'store-id'
    const itemId = 'item-id'

    const result = client.has(storeId, itemId)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeTrue()
  })

  it('get(storeId: string, itemId: string, options?: { rev?: string, token?: string }): Promise<{ rev: string; doc: string }>', async () => {
    const client = createClient()
    const storeId = 'store-id'
    const itemId = 'item-id'

    const result = client.get(storeId, itemId)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toStrictEqual({
      rev: 'revision'
    , doc: 'null'
    })
  })

  it('getJSON(storeId: string, itemId: string, options?: { rev?: string, token?: string }): Promise<{ rev: string; doc: Json }>', async () => {
    const client = createClient()
    const storeId = 'store-id'
    const itemId = 'item-id'

    const result = client.getJSON(storeId, itemId)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toStrictEqual({
      rev: 'revision'
    , doc: null
    })
  })

  it('list(storeId: string, options?: { token?: string }): Promise<string[]>', async () => {
    const client = createClient()
    const storeId = 'store-id'

    const result = client.list(storeId)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toStrictEqual(['id'])
  })

  it('del(storeId: string, itemId: string, options?: { rev?: string; token?: string }): Promise<void>', async () => {
    const client = createClient()
    const storeId = 'store-id'
    const itemId = 'item-id'

    const result = client.del(storeId, itemId)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  it('info(): Promise<Array<{ id: string; items: number }>>', async () => {
    const client = createClient()

    const result = client.info()
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toStrictEqual([
      { id: 'id', items: 1 }
    ])
  })
})

function createClient() {
  return new StoreClient({
    server: 'http://localhost'
  , token: TOKEN
  })
}
