import handleErrors from '../handleErrors.js'
import withToken from '../withToken.js'
import archiveChannel from '../archiveChannel.js'

const errorHandler = async ({ error, respond }) => {
  await respond(`Error archiving channel: ${error.message}.\n\nYou may need to invite the bot to the channel.`)
  return { doNotLogError: true }
}

const archiveChannelCommand = handleErrors(withToken(async ({ command, client, context, token, respond }) => {
  const { channel_id: channel } = command
  const { enterpriseId, teamId } = context

  await respond('Archiving channel. This may take a while...')

  const newMessages = await archiveChannel({
    team: enterpriseId ?? teamId,
    channel,
    client,
    token,
  })

  if (newMessages > 0) {
    await respond(`Archived ${newMessages} new messages`)
  } else {
    await respond('No new messages to archive')
  }
}), errorHandler)

export default archiveChannelCommand
