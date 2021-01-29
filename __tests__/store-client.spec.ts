import { server } from '@test/store.mock'
import { StoreClient } from '@src/store-client'
import { TOKEN } from '@test/utils'
import '@blackglory/jest-matchers'
import 'jest-extended'

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
beforeEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('StoreClient', () => {
  it('set(storeId: string, itemId: string, payload: string): Promise<void>', async () => {
    const client = createClient()
    const storeId = 'store-id'
    const itemId = 'item-id'
    const doc = 'message'

    const result = client.set(storeId, itemId, doc)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  it('setJSON(storeId: string, itemId: string, payload: Json): Promise<void>', async () => {
    const client = createClient()
    const storeId = 'store-id'
    const itemId = 'item-id'
    const doc = { message: 'message' }

    const result = client.setJSON(storeId, itemId, doc)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  it('setCSV<T extends object>(storeId: string, itemId: string, payload: T[]): Promise<void>', async () => {
    const client = createClient()
    const storeId = 'store-id'
    const itemId = 'item-id'
    const doc = [{ message: 'message' }]

    const result = client.setCSV(storeId, itemId, doc)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  it('has(storeId, string, itemId: string): Promise<boolean>', async () => {
    const client = createClient()
    const storeId = 'store-id'
    const itemId = 'item-id'

    const result = client.has(storeId, itemId)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeTrue()
  })

  it('get(storeId: string, itemId: string): Promise<{ revision: string; payload: string }>', async () => {
    const client = createClient()
    const storeId = 'store-id'

    const result = client.get(storeId, 'text')
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toStrictEqual({
      revision: 'revision'
    , payload: 'text'
    })
  })

  it('getJSON(storeId: string, itemId: string): Promise<{ revision: string; payload: Json }>', async () => {
    const client = createClient()
    const storeId = 'store-id'

    const result = client.getJSON(storeId, 'json')
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toStrictEqual({
      revision: 'revision'
    , payload: { 'hello': 'world' }
    })
  })

  it('getCSV<T extends object>(storeId: string, itemId: string): Promise<{ revision: string; payload: T[] }>', async () => {
    const client = createClient()
    const storeId = 'store-id'

    const result = client.getCSV(storeId, 'csv')
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toStrictEqual({
      revision: 'revision'
    , payload: [
        { key: 'hello', value: 'world' }
      ]
    })
  })

  it('getAllItemIds(storeId: string): Promise<string[]>', async () => {
    const client = createClient()
    const storeId = 'store-id'

    const result = client.getAllItemIds(storeId)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toStrictEqual(['id'])
  })

  it('listStores(): Promise<string[]>', async () => {
    const client = createClient()

    const result = client.listStores()
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toStrictEqual(['id'])
  })

  it('del(storeId: string, itemId: string): Promise<void>', async () => {
    const client = createClient()
    const storeId = 'store-id'
    const itemId = 'item-id'

    const result = client.del(storeId, itemId)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  it('clear(storeId: string): Prmise<void>', async () => {
    const client = createClient()
    const storeId = 'store-id'

    const result = client.clear(storeId)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  it('stats(storeId: string): Promise<{ id: string; items: number }>', async () => {
    const client = createClient()
    const storeId = 'store-id'

    const result = client.stats(storeId)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toStrictEqual({
      id: storeId
    , items: 1
    })
  })
})

function createClient() {
  return new StoreClient({
    server: 'http://localhost'
  , token: TOKEN
  })
}
