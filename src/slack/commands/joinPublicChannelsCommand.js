import handleErrors from '../handleErrors.js'
import withToken from '../withToken.js'
import withPagination from '../withPagination.js'

const errorHandler = async ({ error, respond }) => {
  await respond(`Error joining channels: ${error.message}`)
  return { doNotLogError: true }
}

const joinPublicChannelsCommand = handleErrors(withToken(async ({ client, token, respond }) => {
  let newChannels = []
  let archivedChannels = []

  await withPagination(
    cursor => client.conversations.list({ token, cursor })
  )(async ({ channels }) => {
    const unjoinedChannels = channels.filter(channel => !channel.is_member)

    await Promise.all(unjoinedChannels.map(channel => {
      if (channel.is_archived) {
        archivedChannels.push(channel)
        return Promise.resolve()
      } else {
        newChannels.push(channel)
        return client.conversations.join({ token, channel: channel.id })
      }
    }))
  })

  let message = ''

  if (newChannels.length > 0) {
    const channelMentions = newChannels.map(channel => `<#${channel.id}>`).join(' ')
    message += `Joined ${newChannels.length} public channels: ${channelMentions}`
  } else {
    message += 'Already joined all public channels'
  }

  if (archivedChannels.length > 0) {
    const channelMentions = archivedChannels.map(channel => `<#${channel.id}>`).join(' ')
    const channelIds = archivedChannels.map(channel => `${channel.id}`).join(' ')
    message += `\n\nThe following channels are archived in Slack and could not be joined: ${channelMentions}`
  }

  await respond(message)
}), errorHandler)

export default joinPublicChannelsCommand
