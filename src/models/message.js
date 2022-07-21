import sequelize from './sequelize.js'

const Message = sequelize.define('Message', {
  channel_id: {
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
      fields: ['channel_id', 'ts'],
    },
  ],
})

await Message.sync({ alter: true })

const createMessage = ({ channel_id, ts, data }) => Message.create({
  channel_id,
  ts,
  data,
})

const updateMessage = ({ channel_id, ts, data }) => Message.update({
  data,
}, {
  where: {
    channel_id,
    ts,
  },
})

const deleteMessage = ({ channel_id, ts }) => Message.destroy({
  where: {
    channel_id,
    ts,
  },
})

export {
  createMessage,
  updateMessage,
  deleteMessage,
}
