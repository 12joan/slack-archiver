import bolt from '@slack/bolt'
const { App } = bolt

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
})

app.event('message', async ({ event }) => {
  const { subtype = 'message_posted' } = event

  const handlers = {
    message_posted: () => {
      console.log({
        action: 'insert',
        workspace_id: event.team,
        channel_id: event.channel,
        message_id: event.ts,
        message: event,
      })
    },
    message_changed: () => {
      console.log({
        action: 'update',
        workspace_id: event.message.team,
        channel_id: event.channel,
        message_id: event.ts,
        message: {
          channel: event.channel,
          channel_type: event.channel_type,
          ...event.message,
        },
      })
    },
    message_deleted: () => {
      console.log({
        action: 'delete',
        workspace_id: event.previous_message.team,
        channel_id: event.channel,
        message_id: event.ts,
      })
    }
  }

  const defaultHandler = () => console.warn(`Unknown event type: ${subtype}`)

  ;(handlers[subtype] ?? defaultHandler)()
})

;(async () => {
  await app.start(process.env.PORT || 3000)
  console.log('⚡️ Bolt app is running!')
})()
