import { createMessage, updateMessage, deleteMessage } from '../../models/message.js'
import { updateUpTime } from '../../models/upTime.js'

export default app => app.event('message', async ({ event, context }) => {
  const enterpriseOrTeamId = context.enterpriseId ?? context.teamId

  let wasError = false

  try {
    const { subtype = 'message_posted' } = event

    switch (subtype) {
      case 'me_message':
      case 'bot_message':
      case 'file_share':
      case 'message_replied':
      case 'message_posted':
        await createMessage({
          team: enterpriseOrTeamId,
          channel: event.channel,
          ts: event.ts,
          data: event,
        })
        break

      case 'message_changed':
        await updateMessage({
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
  } catch (error) {
    console.error('Error handling event', { error, event })
    wasError = true
  }

  try {
    await updateUpTime({ wasError })
  } catch (error) {
    console.error('Error updating upTime', { error })
  }
})
