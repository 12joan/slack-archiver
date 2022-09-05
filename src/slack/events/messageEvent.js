import handleErrors from '../handleErrors.js'
import withToken from '../withToken.js'
import archiveMessage, { deleteMessage } from '../archiveMessage.js'

export default app => app.event('message', handleErrors(withToken(async ({ event, context, token }) => {
  const enterpriseOrTeamId = context.enterpriseId ?? context.teamId
  const { subtype = 'message_posted' } = event

  switch (subtype) {
    case 'me_message':
    case 'bot_message':
    case 'file_share':
    case 'channel_join':
    case 'message_replied':
    case 'message_posted':
      await archiveMessage({
        token,
        team: enterpriseOrTeamId,
        channel: event.channel,
        ts: event.ts,
        data: event,
      })
      break

    case 'message_changed':
      await archiveMessage({
        token,
        team: enterpriseOrTeamId,
        channel: event.channel,
        ts: event.message.ts,
        data: {
          channel: event.channel,
          channel_type: event.channel_type,
          ...event.message,
        },
      })
      break

    case 'message_deleted':
      await deleteMessage({
        team: enterpriseOrTeamId,
        channel: event.channel,
        ts: event.previous_message.ts,
      })
      break

    default:
      console.warn(`Unhandled event subtype: ${subtype}`, event)
  }
})))
