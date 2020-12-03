import { server } from '@test/revision-policy.mock'
import { RevisionPolicyClient } from '@src/revision-policy-client'
import { ADMIN_PASSWORD } from '@test/utils'
import '@blackglory/jest-matchers'

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
beforeEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('RevisionPolicyClient', () => {
  it('getIds(): Promise<string[]>', async () => {
    const client = createClient()

    const result = client.getIds()
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toStrictEqual(['id'])
  })

  it('get(id: string): Promise<{ updateRevisionRequired: boolean | null; deleteRevisionRequired: boolean | null }>', async () => {
    const client = createClient()
    const id = 'id'

    const result = client.get(id)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toStrictEqual({
      updateRevisionRequired: true
    , deleteRevisionRequired: false
    })
  })

  it('setUpdateRevisionRequired(id: string, val: boolean): Promise<void>', async () => {
    const client = createClient()
    const id = 'id'
    const val = true

    const result = client.setUpdateRevisionRequired(id, val)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  it('removeUpdateRevisionRequired(id: string): Promise<void>', async () => {
    const client = createClient()
    const id = 'id'

    const result = client.removeUpdateRevisionRequired(id)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  it('setDeleteRevisionRequired(id: string, val: boolean): Promise<void>', async () => {
    const client = createClient()
    const id = 'id'
    const val = true

    const result = client.setDeleteRevisionRequired(id, val)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  it('removeDeleteRevisionRequired(id: string): Promise<void>', async () => {
    const client = createClient()
    const id = 'id'

    const result = client.removeDeleteRevisionRequired(id)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })
})

function createClient() {
  return new RevisionPolicyClient({
    server: 'http://localhost'
  , adminPassword: ADMIN_PASSWORD
  })
}
