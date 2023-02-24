import {rest} from 'msw'
import currencyJSON from './currencies.json'

export const handlers = [
  rest.get("*/testPath", (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json([{ "hello": "world" }]));
  }),
  rest.get("*/currency", (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(currencyJSON));
  })
]
