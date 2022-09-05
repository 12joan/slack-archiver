import withPagination from './withPagination.js'
import archiveMessage from './archiveMessage.js'
import sequence from './sequence.js'

const archiveChannel = async ({ team, channel, client, token }) => {
  let newMessages = 0

  const handleMessages = async messages => {
    newMessages += (
      await sequence(messages.map(message => () => archiveMessage({
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

    await sequence(messagesWithReplies.map(messageWithReplies => async () =>
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
