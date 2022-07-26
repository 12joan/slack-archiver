import bolt from '@slack/bolt'
const { App } = bolt

import installationStore from '../models/installationStore.js'
import messageEvent from './events/messageEvent.js'
import channelCreatedEvent from './events/channelCreatedEvent.js'
import memberJoinedChannelEvent from './events/memberJoinedChannelEvent.js'
import slashCommand from './commands/index.js'

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  clientId: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  stateSecret: process.env.SLACK_STATE_SECRET,
  scopes: [
    'app_mentions:read',
    'channels:history',
    'channels:read',
    'channels:join',
    'chat:write',
    'groups:history',
    'im:history',
    'mpim:history',
    'commands',
  ],
  installationStore,
})

;[
  messageEvent,
  channelCreatedEvent,
  memberJoinedChannelEvent,
  slashCommand,
].forEach(registerHandlers => registerHandlers(app))

;(async () => {
  await app.start(process.env.PORT || 3000)
  console.log('⚡️ Bolt app is running!')
})()
