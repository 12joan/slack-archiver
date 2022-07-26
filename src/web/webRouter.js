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
      res.render('viewChannel', { messages })
      break

    case 'invalid':
      res.send('Invalid access token')
      break

    case 'expired':
      res.send('This URL has expired')
      break

    default:
      throw new Error(`Unknown state: ${state}`)
  }
})

export default app
