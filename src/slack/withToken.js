import { findInstallation } from '../models/installationStore.js'

const withToken = func => async args => {
  const { enterpriseId, teamId } = args.context

  const { token } = (
    await findInstallation(enterpriseId ?? teamId)
  ).data.bot

  return func({ ...args, token })
}

export default withToken
