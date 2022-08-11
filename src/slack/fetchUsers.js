import { findInstallation } from '../models/installationStore.js'
import withPagination from './withPagination.js'
import { client } from '../slack/slack.js'

const fetchUsers = async team => {
  const installation = await findInstallation(team)
  const { token } = installation.data.bot

  let users = []

  await withPagination(
    cursor => client.users.list({ token, cursor }),
  )(({ members }) => {
    users = users.concat(members)
  })

  return users
}

export default fetchUsers
