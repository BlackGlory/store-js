import { setupServer } from 'msw/node'
import { rest } from 'msw'
import { badAuth } from '@test/utils'

export const server = setupServer(
  rest.get('/admin/store-with-tokens', (req, res, ctx) => {
    if (badAuth(req)) return res(ctx.status(401))

    return res(
      ctx.status(200)
    , ctx.json(['id'])
    )
  })

, rest.get('/admin/store/:id/tokens', (req, res, ctx) => {
    if (badAuth(req)) return res(ctx.status(401))

    return res(
      ctx.status(200)
    , ctx.json([
        {
          token: 'token'
        , write: true
        , read: false
        , delete: false
        }
      ])
    )
  })

, rest.put('/admin/store/:id/tokens/:token/write', (req, res, ctx) => {
    if (badAuth(req)) return res(ctx.status(401))

    return res(ctx.status(204))
  })

, rest.delete('/admin/store/:id/tokens/:token/write', (req, res, ctx) => {
    if (badAuth(req)) return res(ctx.status(401))

    return res(ctx.status(204))
  })

, rest.put('/admin/store/:id/tokens/:token/read', (req, res, ctx) => {
    if (badAuth(req)) return res(ctx.status(401))

    return res(ctx.status(204))
  })

, rest.delete('/admin/store/:id/tokens/:token/read', (req, res, ctx) => {
    if (badAuth(req)) return res(ctx.status(401))

    return res(ctx.status(204))
  })

, rest.put('/admin/store/:id/tokens/:token/delete', (req, res, ctx) => {
    if (badAuth(req)) return res(ctx.status(401))

    return res(ctx.status(204))
  })

, rest.delete('/admin/store/:id/tokens/:token/delete', (req, res, ctx) => {
    if (badAuth(req)) return res(ctx.status(401))

    return res(ctx.status(204))
  })
)
