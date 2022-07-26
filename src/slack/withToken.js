import withInstallation from './withInstallation.js'

const withToken = func => withInstallation(async ({ installation, ...args }) => {
  const { token } = installation.bot
  return func({ ...args, token })
})

export default withToken
