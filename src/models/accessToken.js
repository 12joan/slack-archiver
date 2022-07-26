import sequelize from './sequelize.js'
import crypto from 'node:crypto'

const AccessToken = sequelize.define('access_token', {
  id: {
    type: sequelize.Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  team: sequelize.Sequelize.STRING,
  token: sequelize.Sequelize.STRING,
  scope: sequelize.Sequelize.STRING,
  data: sequelize.Sequelize.JSON,
  expiresAt: sequelize.Sequelize.DATE,
  createdAt: sequelize.Sequelize.DATE,
  updatedAt: sequelize.Sequelize.DATE,
})

const grantViewToken = async (team, channel) => {
  const accessToken = await AccessToken.create({
    team,
    token: crypto.randomBytes(16).toString('hex'),
    scope: 'view-channel',
    data: { channel },
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
  })

  return accessToken.token
}

const checkViewToken = async token => {
  const accessToken = await AccessToken.findOne({ where: { token } })

  if (!accessToken || accessToken.scope !== 'view-channel') {
    return { state: 'invalid' }
  }

  if (accessToken.expiresAt < new Date()) {
    return { state: 'expired' }
  }

  return {
    state: 'valid',
    team: accessToken.team,
    channel: accessToken.data.channel,
  }
}

export {
  grantViewToken,
  checkViewToken,
}
