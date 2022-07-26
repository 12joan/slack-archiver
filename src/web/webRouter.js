import express from 'express'
import { checkViewToken } from '../models/accessToken.js'

const app = express.Router()

app.get('/view/:token', async (req, res) => {
  res.set('Content-Type', 'text/plain')

  const { token } = req.params
  const { state, team, channel } = await checkViewToken(token)

  switch (state) {
    case 'valid':
      res.send(`Not implemented yet. Team: ${team}, Channel: ${channel}`)
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
