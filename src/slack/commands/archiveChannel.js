import withToken from '../withToken.js'
import { createMessageIfNotExists } from '../../models/message.js'

const archiveChannel = withToken(async ({ command, client, context, token, respond }) => {
  try {
    const { channel_id: channel } = command

    await respond('Archiving channel. This may take a while...')

    let newMessages = 0

    const archiveMessages = async ({ cursor } = {}) => {
      const {
        messages,
        has_more: hasMore,
        response_metadata: responseMetaData,
      } = await client.conversations.history({ token, channel, cursor })

      newMessages += (
        await Promise.all(messages.map(message => createMessageIfNotExists({
          team: context.enterpriseId ?? context.teamId,
          channel,
          ts: message.ts,
          data: message,
        })))
      ).filter(created => created).length

      if (hasMore)
        await archiveMessages({ cursor: responseMetaData.next_cursor })
    }

    await archiveMessages()
    await respond(`Archived ${newMessages} new messages`)
  } catch (error) {
    return respond(`Error archiving channel: ${error.message}. \n\n You may need to invite the bot to the channel.`)
  }
})

export default archiveChannel
