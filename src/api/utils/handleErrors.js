const handleErrors = func => async (...args) => {
  try {
    await func(...args)
  } catch (err) {
    args[2](err)
  }
}

export default handleErrors
