import sequelize from './sequelize.js'

const Message = sequelize.define('Message', {
  channel: {
    type: sequelize.Sequelize.STRING,
    allowNull: false,
  },
  ts: {
    type: sequelize.Sequelize.STRING,
    allowNull: false,
  },
  data: {
    type: sequelize.Sequelize.JSON,
    allowNull: false,
  },
}, {
  indexes: [
    {
      unique: true,
      fields: ['channel', 'ts'],
    },
  ],
})

await Message.sync({ alter: true })

const createMessage = ({ channel, ts, data }) => Message.create({
  channel,
  ts,
  data,
})

const updateMessage = ({ channel, ts, data }) => Message.update({
  data,
}, {
  where: {
    channel,
    ts,
  },
})

const deleteMessage = ({ channel, ts }) => Message.destroy({
  where: {
    channel,
    ts,
  },
})

export {
  createMessage,
  updateMessage,
  deleteMessage,
}
