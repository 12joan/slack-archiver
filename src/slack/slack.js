import bolt from '@slack/bolt'
const { App, ExpressReceiver } = bolt

import installationStore from '../models/installationStore.js'

const receiver = new ExpressReceiver({
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
    'users:read',
    'commands',
    'files:read',
  ],
  installationStore,
  endpoints: {
    events: '/events',
  },
  installerOptions: {
    installPath: '/install',
    redirectUriPath: '/oauth_redirect',
  },
})

const app = new App({
  receiver,
})

const { client } = app

export {
  app,
  client,
  receiver,
}
