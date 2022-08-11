import { app, receiver } from './slack.js'
import installationStore from '../models/installationStore.js'
import messageEvent from './events/messageEvent.js'
import channelCreatedEvent from './events/channelCreatedEvent.js'
import memberJoinedChannelEvent from './events/memberJoinedChannelEvent.js'
import slashCommand from './commands/index.js'

;[
  messageEvent,
  channelCreatedEvent,
  memberJoinedChannelEvent,
  slashCommand,
].forEach(registerHandlers => registerHandlers(app))

export default receiver.router
