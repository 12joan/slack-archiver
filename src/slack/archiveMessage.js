import got from 'got'
import { createOrUpdateMessage, deleteMessage } from '../models/message.js'
import { findFile, createFile, updateFile } from '../models/file.js'
import { uploadFile } from '../s3.js'
import sequence from './sequence.js'

const archiveMessage = async ({ token, team, channel, ts, data }) => {
  await createOrUpdateMessage({ team, channel, ts, data })

  const { files = [] } = data

  await sequence(files.map(({ id, url_private: url }) => async () => {
    if (url === undefined || url === null)
      return

    const fileRecord = await findFile({ team, id })

    if (fileRecord === null || fileRecord === undefined) {
      const s3Key = `${team}/${id}`

      const stream = got.stream(url, { headers: { Authorization: `Bearer ${token}` } })
      await uploadFile({ key: s3Key, body: stream })

      await createFile({ team, id, s3Key, sharedIn: [channel] })
    } else if (!fileRecord.sharedIn.includes(channel)) {
      updateFile({ team, id, sharedIn: [...fileRecord.sharedIn, channel] })
    }
  }))
}

export default archiveMessage
export { deleteMessage }
