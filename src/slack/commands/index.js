import archiveChannel from './archiveChannel.js'

export default app => app.command('/slack-archiver', async args => {
  await args.ack()

  switch (args.command.text.split(/\s+/)[0]) {
    case 'archive-channel':
      await archiveChannel(args)
      break

    case 'help':
    default:
      await args.respond('Help!')
  }
})
