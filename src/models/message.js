import sequelize from './sequelize.js'

const Message = sequelize.define('message', {
  id: {
    type: sequelize.Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  channel: sequelize.Sequelize.STRING,
  ts: sequelize.Sequelize.STRING,
  data: sequelize.Sequelize.JSON,
  createdAt: sequelize.Sequelize.DATE,
  updatedAt: sequelize.Sequelize.DATE,
})

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
