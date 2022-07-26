import { findInstallation } from '../models/installationStore.js'

const withInstallation = func => async args => {
  const { enterpriseId, teamId } = args.context
  const installation = (await findInstallation(enterpriseId ?? teamId)).data
  return func({ ...args, installation })
}

export default withInstallation
