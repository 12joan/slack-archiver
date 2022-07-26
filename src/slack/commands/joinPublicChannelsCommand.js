import handleErrors from '../handleErrors.js'
import withToken from '../withToken.js'
import withPagination from '../withPagination.js'

const errorHandler = async ({ error, respond }) => {
  await respond(`Error joining channels: ${error.message}`)
  return { doNotLogError: true }
}

const joinPublicChannelsCommand = handleErrors(withToken(async ({ client, token, respond }) => {
  let newChannels = []

  await withPagination(
    cursor => client.conversations.list({ token, cursor })
  )(async ({ channels }) => {
    const unjoinedChannels = channels.filter(channel => !channel.is_member)

    newChannels = newChannels.concat(unjoinedChannels)

    await Promise.all(unjoinedChannels.map(channel => 
      client.conversations.join({ token, channel: channel.id })
    ))
  })

  if (newChannels.length > 0) {
    const channelMentions = newChannels.map(channel => `<#${channel.id}>`).join(' ')
    await respond(`Joined ${newChannels.length} public channels: ${channelMentions}`)
  } else {
    await respond('Already joined all public channels')
  }
}), errorHandler)

export default joinPublicChannelsCommand
