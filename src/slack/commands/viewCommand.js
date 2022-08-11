import handleErrors from '../handleErrors.js'
import { grantViewToken } from '../../models/accessToken.js'

const errorHandler = async ({ error, respond }) => {
  await respond(`Error creating view link: ${error.message}`)
  return { doNotLogError: true }
}

const viewCommand = handleErrors(async ({ command, context, respond }) => {
  const { channel_id: channel } = command
  const { enterpriseId, teamId } = context

  const token = await grantViewToken(enterpriseId ?? teamId, channel)

  await respond({
    text: `*<https://${process.env.WEB_HOST ?? 'example.com'}/app/view#${token}|View channel archive>* (Expires in 7 days)`,
    type: 'mrkdwn',
  })
}, errorHandler)

export default viewCommand
