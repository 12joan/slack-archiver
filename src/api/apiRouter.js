import express from 'express'
import handleErrors from './utils/handleErrors.js'
import withValidToken from './utils/withValidToken.js'
import { fetchMessagesForChannel } from '../models/message.js'
import fetchUsers from '../slack/fetchUsers.js'

const app = express.Router()

app.get('/messages/:token', handleErrors(withValidToken(async (token, req, res) => {
  const { team, channel } = token
  const page = Math.max(parseInt(req.query.page) || 1, 1)
  const data = await fetchMessagesForChannel({ team, channel, page, limit: 100 })
  res.json({ ok: true, data })
})))

app.get('/users/:token', handleErrors(withValidToken(async (token, req, res) => {
  const users = await fetchUsers(token.team)
  res.json({ ok: true, data: users })
})))

export default app
