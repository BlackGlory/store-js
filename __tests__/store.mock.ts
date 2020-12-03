import { setupServer } from 'msw/node'
import { rest } from 'msw'
import { badJson, badToken } from '@test/utils'

export const server = setupServer(
  rest.put('/store/:storeId/items/:itemId', (req, res, ctx) => {
    if (badToken(req)) return res(ctx.status(401))
    if (badJson(req)) return res(ctx.status(400))

    return res(
      ctx.status(204)
    , ctx.set('ETag', 'revision')
    )
  })

, rest.head('/store/:storeId/items/:itemId', (req, res, ctx) => {
    if (badToken(req)) return res(ctx.status(401))

    return res(
      ctx.status(200)
    , ctx.set('ETag', 'revision')
    )
  })

, rest.get('/store/:storeId/items/:itemId', (req, res, ctx) => {
    if (badToken(req)) return res(ctx.status(401))

    return res(
      ctx.status(200)
    , ctx.set('ETag', 'revision')
    , ctx.json({})
    )
  })

, rest.get('/store/:storeId/items', (req, res, ctx) => {
    if (badToken(req)) return res(ctx.status(401))

    return res(
      ctx.status(200)
    , ctx.json(['id'])
    )
  })

, rest.delete('/store/:storeId/items/:itemId', (req, res, ctx) => {
    if (badToken(req)) return res(ctx.status(401))

    return res(ctx.status(204))
  })
)
