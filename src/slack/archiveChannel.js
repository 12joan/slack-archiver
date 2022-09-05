import withPagination from './withPagination.js'
import archiveMessage from './archiveMessage.js'

const archiveChannel = async ({ team, channel, client, token }) => {
  let newMessages = 0

  const handleMessages = async messages => {
    newMessages += (
      await Promise.all(messages.map(message => archiveMessage({
        token,
        team,
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

  return newMessages
}

export default archiveChannel
