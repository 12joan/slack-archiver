import handleErrors from '../handleErrors.js'
import withToken from '../withToken.js'
import withPagination from '../withPagination.js'
import { createOrUpdateMessage } from '../../models/message.js'

const errorHandler = async ({ error, respond }) => {
  await respond(`Error archiving channel: ${error.message}.\n\nYou may need to invite the bot to the channel.`)
  return { doNotLogError: true }
}

const archiveChannel = handleErrors(withToken(async ({ command, client, context, token, respond }) => {
  const { channel_id: channel } = command

  await respond('Archiving channel. This may take a while...')

  let newMessages = 0

  const handleMessages = async messages => {
    newMessages += (
      await Promise.all(messages.map(message => createOrUpdateMessage({
        team: context.enterpriseId ?? context.teamId,
        channel,
        ts: message.ts,
        data: message,
      })))
    ).filter(created => created).length
  }

  await withPagination(
    cursor => client.conversations.history({ token, channel, cursor })
  )(async ({ messages }) => {
    await handleMessages(messages)

    const messagesWithReplies = messages.filter(message => (message.reply_count ?? 0) > 0) 

    await Promise.all(messagesWithReplies.map(async messageWithReplies =>
      withPagination(
        cursor => client.conversations.replies({ token, channel, ts: messageWithReplies.ts, cursor })
      )(async ({ messages }) => {
        const replies = messages.filter(message => message.ts !== messageWithReplies.ts)
        await handleMessages(replies)
      })
    ))
  })

  await respond(`Archived ${newMessages} new messages`)
}), errorHandler)

export default archiveChannel
