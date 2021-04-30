import { server } from '@test/store.mock'
import { StoreClient, NotFound } from '@src/store-client'
import { TOKEN } from '@test/utils'
import { getErrorPromise } from 'return-style'
import '@blackglory/jest-matchers'
import 'jest-extended'

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
beforeEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('StoreClient', () => {
  test('set(namespace: string, id: string, payload: string): Promise<void>', async () => {
    const client = createClient()
    const namespace = 'namespace'
    const id = 'item-id'
    const doc = 'message'

    const result = client.set(namespace, id, doc)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  test('setJSON(namespace: string, id: string, payload: Json): Promise<void>', async () => {
    const client = createClient()
    const namespace = 'namespace'
    const id = 'item-id'
    const doc = { message: 'message' }

    const result = client.setJSON(namespace, id, doc)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
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

    const result = client.setCSV(namespace, id, doc)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  describe('has(namespace, string, id: string): Promise<boolean>', () => {
    describe('exist', () => {
      it('return true', async () => {
        const client = createClient()
        const namespace = 'namespace'

        const result = client.has(namespace, 'id')
        const proResult = await result

        expect(result).toBePromise()
        expect(proResult).toBeTrue()
      })
    })

    describe('not exist', () => {
      it('return false', async () => {
        const client = createClient()
        const namespace = 'namespace'

        const result = client.has(namespace, 'not-found')
        const proResult = await result

        expect(result).toBePromise()
        expect(proResult).toBeFalse()
      })
    })
  })

  describe(`
    get(
      namespace: string
    , id: string
    ): Promise<{ revision: string; payload: string }>
  `, () => {
    describe('exist', () => {
      it('return item', async () => {
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
    })

    describe('not exist', () => {
      it('throw NotFound', async () => {
        const client = createClient()
        const namespace = 'namespace'

        const result = client.get(namespace, 'not-found')
        const err = await getErrorPromise(result)

        expect(result).toBePromise()
        expect(err).toBeInstanceOf(NotFound)
      })
    })
  })

  describe(`
    tryGet(
      namespace: string
    , id: string
    ): Promise<{ revision: string; payload: string } | null>
  `, () => {
    describe('exist', () => {
      it('return item', async () => {
        const client = createClient()
        const namespace = 'namespace'

        const result = client.tryGet(namespace, 'text')
        const proResult = await result

        expect(result).toBePromise()
        expect(proResult).toStrictEqual({
          revision: 'revision'
        , payload: 'text'
        })
      })
    })

    describe('not exist', () => {
      it('return null', async () => {
        const client = createClient()
        const namespace = 'namespace'

        const result = client.tryGet(namespace, 'not-found')
        const proResult = await result

        expect(result).toBePromise()
        expect(proResult).toBeNull()
      })
    })
  })

  describe(`
    getJSON(
      namespace: string
    , id: string
    ): Promise<{ revision: string; payload: Json }>
  `, () => {
    describe('exist', () => {
      it('return item', async () => {
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
    })

    describe('not exist', () => {
      it('throw NotFound', async () => {
        const client = createClient()
        const namespace = 'namespace'

        const result = client.getJSON(namespace, 'not-found')
        const err = await getErrorPromise(result)

        expect(result).toBePromise()
        expect(err).toBeInstanceOf(NotFound)
      })
    })
  })

  describe(`
    tryGetJSON(
      namespace: string
    , id: string
    ): Promise<{ revision: string; payload: Json } | null>
  `, () => {
    describe('exist', () => {
      it('return item', async () => {
        const client = createClient()
        const namespace = 'namespace'

        const result = client.tryGetJSON(namespace, 'json')
        const proResult = await result

        expect(result).toBePromise()
        expect(proResult).toStrictEqual({
          revision: 'revision'
        , payload: { 'hello': 'world' }
        })
      })
    })

    describe('not exist', () => {
      it('throw NotFound', async () => {
        const client = createClient()
        const namespace = 'namespace'

        const result = client.tryGetJSON(namespace, 'not-found')
        const proResult = await result

        expect(result).toBePromise()
        expect(proResult).toBeNull()
      })
    })
  })


  describe(`
    getCSV<T extends object>(
      namespace: string
    , id: string
    ): Promise<{ revision: string; payload: T[] }>
  `, () => {
    describe('exist', () => {
      it('return item', async () => {
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
    })

    describe('not exist', () => {
      it('thrown NotFound', async () => {
        const client = createClient()
        const namespace = 'namespace'

        const result = client.getCSV(namespace, 'not-found')
        const err = await getErrorPromise(result)

        expect(result).toBePromise()
        expect(err).toBeInstanceOf(NotFound)
      })
    })
  })

  describe(`
    tryGetCSV<T extends object>(
      namespace: string
    , id: string
    ): Promise<{ revision: string; payload: T[] } | null>
  `, () => {
    describe('exist', () => {
      it('return item', async () => {
        const client = createClient()
        const namespace = 'namespace'

        const result = client.tryGetCSV(namespace, 'csv')
        const proResult = await result

        expect(result).toBePromise()
        expect(proResult).toStrictEqual({
          revision: 'revision'
        , payload: [
            { key: 'hello', value: 'world' }
          ]
        })
      })
    })

    describe('not exist', () => {
      it('thrown NotFound', async () => {
        const client = createClient()
        const namespace = 'namespace'

        const result = client.tryGetCSV(namespace, 'not-found')
        const proResult = await result

        expect(result).toBePromise()
        expect(proResult).toBeNull()
      })
    })
  })

  test('getAllItemIds(namespace: string): Promise<string[]>', async () => {
    const client = createClient()
    const namespace = 'namespace'

    const result = client.getAllItemIds(namespace)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toStrictEqual(['id'])
  })

  test('getAllNamespaces(): Promise<string[]>', async () => {
    const client = createClient()

    const result = client.getAllNamespaces()
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toStrictEqual(['namespace'])
  })

  test('del(namespace: string, id: string): Promise<void>', async () => {
    const client = createClient()
    const namespace = 'namespace'
    const id = 'item-id'

    const result = client.del(namespace, id)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  test('clear(namespace: string): Prmise<void>', async () => {
    const client = createClient()
    const namespace = 'namespace'

    const result = client.clear(namespace)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  test('stats(namespace: string): Promise<{ namespace: string; items: number }>', async () => {
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
