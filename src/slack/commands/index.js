import archiveChannelCommand from './archiveChannelCommand.js'
import joinPublicChannelsCommand from './joinPublicChannelsCommand.js'
import viewCommand from './viewCommand.js'

const commands = {
  'archive-channel': { handler: archiveChannelCommand, description: 'Archive all messages in the current channel' },
  'join-public-channels': { handler: joinPublicChannelsCommand, description: 'Join all public channels' },
  'view': { handler: viewCommand, description: 'View the archive for the current channel' }
}

const commandHints = Object.entries(commands).map(([command, { description }]) =>
  `\`/slack-archiver ${command}\` - ${description}`
).join('\n')

export default app => app.command('/slack-archiver', async args => {
  await args.ack()

  const command = args.command.text.split(/\s+/)[0]

  if (command in commands) {
    await commands[command].handler(args)
  } else {
    await args.respond(`Usage:\n\n${commandHints}`)
  }
})
