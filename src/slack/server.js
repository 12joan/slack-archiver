import bolt from '@slack/bolt'
const { App } = bolt

import { createMessage, updateMessage, deleteMessage } from '../models/message.js'

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
})

app.event('message', async ({ event }) => {
  try {
    const { subtype = 'message_posted' } = event

    switch (subtype) {
      case 'me_message':
      case 'bot_message':
      case 'file_share':
      case 'message_replied':
      case 'message_posted':
        await createMessage({
          channel_id: event.channel,
          ts: event.ts,
          data: event,
        })
        break

      case 'message_changed':
        await updateMessage({
          channel_id: event.channel,
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
          channel_id: event.channel,
          ts: event.previous_message.ts,
        })
        break

      default:
        console.warn(`Unhandled event subtype: ${subtype}`, event)
    }
  } catch (error) {
    console.error('Error handling event', { error, event })
  }
})

;(async () => {
  await app.start(process.env.PORT || 3000)
  console.log('⚡️ Bolt app is running!')
})()
