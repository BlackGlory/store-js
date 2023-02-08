import { StoreClient } from '@src/store-client.js'

const server = 'ws://store:8080'

describe('StoreClient', () => {
  test('setItem, getItem', async () => {
    const client = await StoreClient.create({ server })

    try {
      await client.setItem('namespace', 'item-id', 'value')
      const result = await client.getItem('namespace', 'item-id')

      expect(result).toStrictEqual({
        value: 'value'
      , revision: expect.any(String)
      })
    } finally {
      await client.clearItemsByNamespace('namespace')
      await client.close()
    }
  })
})
