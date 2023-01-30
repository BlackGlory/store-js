import { server } from '@test/client.mock.js'
import { StoreClient } from '@src/client.js'
import { TOKEN } from '@test/utils.js'
import '@test/polyfill.js'

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
beforeEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('StoreClient', () => {
  test('set(namespace: string, id: string, payload: string): Promise<void>', async () => {
    const client = createClient()
    const namespace = 'namespace'
    const id = 'item-id'
    const doc = 'message'

    const result = await client.set(namespace, id, doc)

    expect(result).toBeUndefined()
  })

  test('setJSON(namespace: string, id: string, payload: Json): Promise<void>', async () => {
    const client = createClient()
    const namespace = 'namespace'
    const id = 'item-id'
    const doc = { message: 'message' }

    const result = await client.setJSON(namespace, id, doc)

    expect(result).toBeUndefined()
  })

  test(`
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

    const result = await client.setCSV(namespace, id, doc)

    expect(result).toBeUndefined()
  })

  describe('has(namespace, string, id: string): Promise<boolean>', () => {
    describe('exist', () => {
      it('return true', async () => {
        const client = createClient()
        const namespace = 'namespace'

        const result = await client.has(namespace, 'id')

        expect(result).toBe(true)
      })
    })

    describe('not exist', () => {
      it('return false', async () => {
        const client = createClient()
        const namespace = 'namespace'

        const result = await client.has(namespace, 'not-found')

        expect(result).toBe(false)
      })
    })
  })

  describe(`
    get(
      namespace: string
    , id: string
    ): Promise<{ revision: string; payload: string } | undefined>
  `, () => {
    describe('exist', () => {
      it('return item', async () => {
        const client = createClient()
        const namespace = 'namespace'

        const result = await client.get(namespace, 'text')

        expect(result).toStrictEqual({
          revision: 'revision'
        , payload: 'text'
        })
      })
    })

    describe('not exist', () => {
      it('return undefined', async () => {
        const client = createClient()
        const namespace = 'namespace'

        const result = await client.get(namespace, 'not-found')

        expect(result).toBeUndefined()
      })
    })
  })

  describe(`
    getJSON(
      namespace: string
    , id: string
    ): Promise<{ revision: string; payload: Json } | undefined>
  `, () => {
    describe('exist', () => {
      it('return item', async () => {
        const client = createClient()
        const namespace = 'namespace'

        const result = await client.getJSON(namespace, 'json')

        expect(result).toStrictEqual({
          revision: 'revision'
        , payload: { 'hello': 'world' }
        })
      })
    })

    describe('not exist', () => {
      it('return undefined', async () => {
        const client = createClient()
        const namespace = 'namespace'

        const result = await client.getJSON(namespace, 'not-found')

        expect(result).toBeUndefined()
      })
    })
  })

  test('getAllItemIds(namespace: string): Promise<string[]>', async () => {
    const client = createClient()
    const namespace = 'namespace'

    const result = await client.getAllItemIds(namespace)

    expect(result).toStrictEqual(['id'])
  })

  test('getAllNamespaces(): Promise<string[]>', async () => {
    const client = createClient()

    const result = await client.getAllNamespaces()

    expect(result).toStrictEqual(['namespace'])
  })

  test('del(namespace: string, id: string): Promise<void>', async () => {
    const client = createClient()
    const namespace = 'namespace'
    const id = 'item-id'

    const result = await client.del(namespace, id)

    expect(result).toBeUndefined()
  })

  test('clear(namespace: string): Prmise<void>', async () => {
    const client = createClient()
    const namespace = 'namespace'

    const result = await client.clear(namespace)

    expect(result).toBeUndefined()
  })

  test('stats(namespace: string): Promise<{ namespace: string; items: number }>', async () => {
    const client = createClient()
    const namespace = 'namespace'

    const result = await client.stats(namespace)

    expect(result).toStrictEqual({
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
