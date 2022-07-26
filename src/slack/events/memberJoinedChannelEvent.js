import handleErrors from '../handleErrors.js'
import withInstallation from '../withInstallation.js'
import archiveChannel from '../archiveChannel.js'

export default app => app.event('member_joined_channel', handleErrors(withInstallation(async ({ event, installation, client }) => {
  const { team, channel, user } = event

  // If we, the bot, joined the channel, archive it.
  if (user !== installation.bot.userId)
    return

  const { token } = installation.bot

  await archiveChannel({
    team,
    channel,
    client,
    token,
  })
})))
