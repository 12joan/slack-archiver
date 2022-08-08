import express from 'express'
import { checkViewToken } from '../models/accessToken.js'
import { fetchMessagesForChannel } from '../models/message.js'

const app = express.Router()

app.get('/view/:token', async (req, res) => {
  const { token } = req.params
  const { state, team, channel } = await checkViewToken(token)

  switch (state) {
    case 'valid':
      const messages = await fetchMessagesForChannel({ team, channel })
      res.json({ ok: true, data: messages })
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
})

export default app
