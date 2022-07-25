import sequelize from './sequelize.js'

const Message = sequelize.define('message', {
  id: {
    type: sequelize.Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  team: sequelize.Sequelize.STRING,
  channel: sequelize.Sequelize.STRING,
  ts: sequelize.Sequelize.STRING,
  data: sequelize.Sequelize.JSON,
  createdAt: sequelize.Sequelize.DATE,
  updatedAt: sequelize.Sequelize.DATE,
})

const createMessage = ({ team, channel, ts, data }) => Message.create({
  team,
  channel,
  ts,
  data,
})

const createOrUpdateMessage = async ({ team, channel, ts, data }) => {
  const [message, created] = await Message.findOrCreate({
    where: { team, channel, ts },
    defaults: { data },
  })

  if (!created) {
    await message.update({ data })
  }

  return created
}

const updateMessage = ({ team, channel, ts, data }) => Message.update({
  data,
}, {
  where: {
    team,
    channel,
    ts,
  },
})

const deleteMessage = ({ team, channel, ts }) => Message.destroy({
  where: {
    team,
    channel,
    ts,
  },
})

export {
  createMessage,
  createOrUpdateMessage,
  updateMessage,
  deleteMessage,
}
