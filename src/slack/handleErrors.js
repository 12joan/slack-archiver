import { updateUpTime } from '../models/upTime.js'

const handleErrors = (procedure, customHandler = undefined) => async args => {
  let wasError = false

  try {
    await procedure(args)
  } catch (error) {
    let shouldLog = true

    if (customHandler !== undefined) {
      await customHandler({ ...args, error })
        .then(result => shouldLog = !(result?.doNotLogError ?? false))
        .catch(error => console.error('Custom error handler encountered an error:', error))
    }

    if (shouldLog) {
      console.error('Unexpected error:', { error, args })
      wasError = true
    }
  } finally {
    await updateUpTime({ wasError })
      .catch(error => console.error('Encountered an error while updating uptime:', error))
  }
}

export default handleErrors
