import { setupServer } from 'msw/node'
import { rest } from 'msw'
import { badToken } from '@test/utils'

export const server = setupServer(
  rest.put('/store/:storeId/items/:itemId', (req, res, ctx) => {
    if (badToken(req)) return res(ctx.status(401))

    return res(
      ctx.status(204)
    )
  })

, rest.head('/store/:storeId/items/:itemId', (req, res, ctx) => {
    if (badToken(req)) return res(ctx.status(401))

    return res(
      ctx.status(200)
    , ctx.set('ETag', 'revision')
    )
  })

, rest.get('/store/:storeId/items/text', (req, res, ctx) => {
    if (badToken(req)) return res(ctx.status(401))

    return res(
      ctx.status(200)
    , ctx.set('ETag', 'revision')
    , ctx.text('text')
    )
  })

, rest.get('/store/:storeId/items/json', (req, res, ctx) => {
    if (badToken(req)) return res(ctx.status(401))

    return res(
      ctx.status(200)
    , ctx.set('ETag', 'revision')
    , ctx.json({ hello: 'world' })
    )
  })

, rest.get('/store/:storeId/items/csv', (req, res, ctx) => {
    if (badToken(req)) return res(ctx.status(401))

    return res(
      ctx.status(200)
    , ctx.set('ETag', 'revision')
    , ctx.text('key,value\r\nhello,world')
    )
  })

, rest.get('/store/:storeId/items', (req, res, ctx) => {
    if (badToken(req)) return res(ctx.status(401))

    return res(
      ctx.status(200)
    , ctx.json(['id'])
    )
  })

, rest.get('/store/:storeId/stats', (req, res, ctx) => {
    return res(
      ctx.status(200)
    , ctx.json({
        id: req.params.storeId
      , items: 1
      })
    )
  })

, rest.get('/store', (req, res, ctx) => {
    return res(
      ctx.status(200)
    , ctx.json(['id'])
    )
  })

, rest.delete('/store/:storeId/items/:itemId', (req, res, ctx) => {
    if (badToken(req)) return res(ctx.status(401))

    return res(ctx.status(204))
  })

, rest.delete('/store/:storeId', (req, res, ctx) => {
    if (badToken(req)) return res(ctx.status(401))

    return res(ctx.status(204))
  })

, rest.get('/store', (req, res, ctx) => {
    return res(
      ctx.status(200)
    , ctx.json([
        { id: 'id', items: 1 }
      ])
    )
  })
)
