import { server } from '@test/store.mock'
import { StoreClient } from '@src/store-client'
import { TOKEN } from '@test/utils'
import '@blackglory/jest-matchers'
import 'jest-extended'

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
beforeEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('StoreClient', () => {
  it('set(namespace: string, id: string, payload: string): Promise<void>', async () => {
    const client = createClient()
    const namespace = 'namespace'
    const id = 'item-id'
    const doc = 'message'

    const result = client.set(namespace, id, doc)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  it('setJSON(namespace: string, id: string, payload: Json): Promise<void>', async () => {
    const client = createClient()
    const namespace = 'namespace'
    const id = 'item-id'
    const doc = { message: 'message' }

    const result = client.setJSON(namespace, id, doc)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  it(`
    setCSV<T extends object>(
      namespace: string
    , id: string
    , payload: T[]
    ): Promise<void>
  `, async () => {
    const client = createClient()
    const namespace = 'namespace'
    const id = 'item-id'
    const doc = [{ message: 'message' }]

    const result = client.setCSV(namespace, id, doc)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  it('has(namespace, string, id: string): Promise<boolean>', async () => {
    const client = createClient()
    const namespace = 'namespace'
    const id = 'item-id'

    const result = client.has(namespace, id)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeTrue()
  })

  it(`
    get(
      namespace: string
    , id: string
    ): Promise<{ revision: string; payload: string }>
  `, async () => {
    const client = createClient()
    const namespace = 'namespace'

    const result = client.get(namespace, 'text')
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toStrictEqual({
      revision: 'revision'
    , payload: 'text'
    })
  })

  it(`
    getJSON(
      namespace: string
    , id: string
    ): Promise<{ revision: string; payload: Json }>
  `, async () => {
    const client = createClient()
    const namespace = 'namespace'

    const result = client.getJSON(namespace, 'json')
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toStrictEqual({
      revision: 'revision'
    , payload: { 'hello': 'world' }
    })
  })

  it(`
    getCSV<T extends object>(
      namespace: string
    , id: string
    ): Promise<{ revision: string; payload: T[] }>
  `, async () => {
    const client = createClient()
    const namespace = 'namespace'

    const result = client.getCSV(namespace, 'csv')
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toStrictEqual({
      revision: 'revision'
    , payload: [
        { key: 'hello', value: 'world' }
      ]
    })
  })

  it('getAllItemIds(namespace: string): Promise<string[]>', async () => {
    const client = createClient()
    const namespace = 'namespace'

    const result = client.getAllItemIds(namespace)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toStrictEqual(['id'])
  })

  it('getAllNamespaces(): Promise<string[]>', async () => {
    const client = createClient()

    const result = client.getAllNamespaces()
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toStrictEqual(['namespace'])
  })

  it('del(namespace: string, id: string): Promise<void>', async () => {
    const client = createClient()
    const namespace = 'namespace'
    const id = 'item-id'

    const result = client.del(namespace, id)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  it('clear(namespace: string): Prmise<void>', async () => {
    const client = createClient()
    const namespace = 'namespace'

    const result = client.clear(namespace)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  it('stats(namespace: string): Promise<{ namespace: string; items: number }>', async () => {
    const client = createClient()
    const namespace = 'namespace'

    const result = client.stats(namespace)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toStrictEqual({
      namespace
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
