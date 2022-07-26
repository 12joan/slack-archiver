import handleErrors from '../handleErrors.js'
import withToken from '../withToken.js'

export default app => app.event('channel_created', handleErrors(withToken(async ({ event, client, token }) =>
  client.conversations.join({
    token,
    channel: event.channel.id,
  })
)))
