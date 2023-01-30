import { setupServer } from 'msw/node'
import { rest } from 'msw'
import { badAuth, badJson } from '@test/utils.js'

export const server = setupServer(
  rest.get('/admin/store-with-revision-policies', (req, res, ctx) => {
    if (badAuth(req)) return res(ctx.status(401))

    return res(
      ctx.status(200)
    , ctx.json(['namespace'])
    )
  })

, rest.get('/admin/store/:namespace/revision-policies', (req, res, ctx) => {
    if (badAuth(req)) return res(ctx.status(401))

    return res(
      ctx.status(200)
    , ctx.json({
        updateRevisionRequired: true
      , deleteRevisionRequired: false
      })
    )
  })

, rest.put('/admin/store/:namespace/revision-policies/update-revision-required', (req, res, ctx) => {
    if (badAuth(req)) return res(ctx.status(401))
    if (badJson(req)) return res(ctx.status(400))

    return res(ctx.status(204))
  })

, rest.delete('/admin/store/:namespace/revision-policies/update-revision-required', (req, res, ctx) => {
    if (badAuth(req)) return res(ctx.status(401))

    return res(ctx.status(204))
  })

, rest.put('/admin/store/:namespace/revision-policies/delete-revision-required', (req, res, ctx) => {
    if (badAuth(req)) return res(ctx.status(401))
    if (badJson(req)) return res(ctx.status(400))

    return res(ctx.status(204))
  })

, rest.delete('/admin/store/:namespace/revision-policies/delete-revision-required', (req, res, ctx) => {
    if (badAuth(req)) return res(ctx.status(401))

    return res(ctx.status(204))
  })
)
