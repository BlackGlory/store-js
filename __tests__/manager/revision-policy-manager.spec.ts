import { server } from './revision-policy-manager.mock.js'
import { RevisionPolicyManager } from '@manager/revision-policy-manager.js'
import { ADMIN_PASSWORD } from '@test/utils.js'
import '@test/polyfill.js'

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
beforeEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('RevisionPolicyManager', () => {
  test('getNamespaces(): Promise<string[]>', async () => {
    const client = createManager()

    const result = await client.getNamespaces()

    expect(result).toStrictEqual(['namespace'])
  })

  test(`
    get(namespace: string): Promise<{
      updateRevisionRequired: boolean | null
      deleteRevisionRequired: boolean | null
    }>
  `, async () => {
    const client = createManager()
    const namespace = 'namespace'

    const result = await client.get(namespace)

    expect(result).toStrictEqual({
      updateRevisionRequired: true
    , deleteRevisionRequired: false
    })
  })

  test('setUpdateRevisionRequired(namespace: string, val: boolean): Promise<void>', async () => {
    const client = createManager()
    const namespace = 'namespace'
    const val = true

    const result = await client.setUpdateRevisionRequired(namespace, val)

    expect(result).toBeUndefined()
  })

  test('removeUpdateRevisionRequired(namespace: string): Promise<void>', async () => {
    const client = createManager()
    const namespace = 'namespace'

    const result = await client.removeUpdateRevisionRequired(namespace)

    expect(result).toBeUndefined()
  })

  test('setDeleteRevisionRequired(namespace: string, val: boolean): Promise<void>', async () => {
    const client = createManager()
    const namespace = 'namespace'
    const val = true

    const result = await client.setDeleteRevisionRequired(namespace, val)

    expect(result).toBeUndefined()
  })

  test('removeDeleteRevisionRequired(namespace: string): Promise<void>', async () => {
    const client = createManager()
    const namespace = 'namespace'

    const result = await client.removeDeleteRevisionRequired(namespace)

    expect(result).toBeUndefined()
  })
})

function createManager() {
  return new RevisionPolicyManager({
    server: 'http://localhost'
  , adminPassword: ADMIN_PASSWORD
  })
}
