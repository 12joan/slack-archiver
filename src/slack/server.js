import bolt from '@slack/bolt'
const { App } = bolt

import installationStore from '../models/installationStore.js'
import { createMessage, updateMessage, deleteMessage } from '../models/message.js'
import { updateUpTime } from '../models/upTime.js'

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  clientId: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  stateSecret: process.env.SLACK_STATE_SECRET,
  scopes: ['app_mentions:read', 'channels:history', 'chat:write', 'groups:history', 'im:history', 'mpim:history'],
  installationStore,
})

app.event('message', async ({ event, context }) => {
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

;(async () => {
  await app.start(process.env.PORT || 3000)
  console.log('⚡️ Bolt app is running!')
})()
