import bolt from '@slack/bolt'
const { App } = bolt

import { createMessage, updateMessage, deleteMessage } from '../models/message.js'

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
})

app.event('message', ({ event }) => {
  const { subtype = 'message_posted' } = event

  switch (subtype) {
    case 'message_posted':
      createMessage({
        workspace_id: event.team,
        channel_id: event.channel,
        ts: event.ts,
        data: event,
      })
      break

    case 'message_changed':
      updateMessage({
        workspace_id: event.message.team,
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
      deleteMessage({
        workspace_id: event.previous_message.team,
        channel_id: event.channel,
        ts: event.previous_message.ts,
      })
      break

    default:
      console.warn(`Unhandled event subtype: ${subtype}`)
  }
})

;(async () => {
  await app.start(process.env.PORT || 3000)
  console.log('⚡️ Bolt app is running!')
})()
