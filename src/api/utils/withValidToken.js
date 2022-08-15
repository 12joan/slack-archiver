import { checkViewToken } from '../../models/accessToken.js'

const withValidToken = func => async (...args) => {
  const [req, res] = args
  const token = await checkViewToken(req.params.token)

  switch (token.state) {
    case 'valid':
      return func(token, ...args)
      break

    case 'invalid':
      res.json({ ok: false, error: 'This view link is invalid' })
      break

    case 'expired':
      res.json({ ok: false, error: 'This view link has expried' })
      break

    default:
      throw new Error(`Unknown state: ${state}`)
  }
}

export default withValidToken
