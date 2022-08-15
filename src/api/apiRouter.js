import express from 'express'
import { checkViewToken } from '../models/accessToken.js'
import { fetchMessagesForChannel } from '../models/message.js'
import fetchUsers from '../slack/fetchUsers.js'

const app = express.Router()

const withValidToken = func => async (...args) => {
  const [req, res] = args
  const token = await checkViewToken(req.params.token)

  switch (token.state) {
    case 'valid':
      return func(token, ...args)
      break

    case 'invalid':
      res.json({ ok: false, error: 'This view link is invalid' })
      break

    case 'expired':
      res.json({ ok: false, error: 'This view link has expried' })
      break

    default:
      throw new Error(`Unknown state: ${state}`)
  }
}

app.get('/messages/:token', withValidToken(async (token, req, res) => {
  const { team, channel } = token
  const page = Math.max(parseInt(req.query.page) || 1, 1)
  const data = await fetchMessagesForChannel({ team, channel, page, limit: 100 })
  res.json({ ok: true, data })
}))

app.get('/users/:token', withValidToken(async (token, req, res) => {
  const users = await fetchUsers(token.team)
  res.json({ ok: true, data: users })
}))

export default app
