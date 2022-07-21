import sequelize from './sequelize.js'

const Message = sequelize.define('Message', {
  workspace_id: {
    type: sequelize.Sequelize.STRING,
    allowNull: false,
  },
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
      fields: ['workspace_id', 'channel_id', 'ts'],
    },
  ],
})

await Message.sync({ alter: true })

const createMessage = ({ workspace_id, channel_id, ts, data }) => Message.create({
  workspace_id,
  channel_id,
  ts,
  data,
})

const updateMessage = ({ workspace_id, channel_id, ts, data }) => Message.update({
  data,
}, {
  where: {
    workspace_id,
    channel_id,
    ts,
  },
})

const deleteMessage = ({ workspace_id, channel_id, ts }) => Message.destroy({
  where: {
    workspace_id,
    channel_id,
    ts,
  },
})

export {
  createMessage,
  updateMessage,
  deleteMessage,
}
