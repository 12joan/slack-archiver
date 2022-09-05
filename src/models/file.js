import sequelize from './sequelize.js'

const File = sequelize.define('file', {
  id: {
    type: sequelize.Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  team: sequelize.Sequelize.STRING,
  slackFileId: sequelize.Sequelize.STRING,
  s3Key: sequelize.Sequelize.STRING,
  sharedIn: sequelize.Sequelize.ARRAY(sequelize.Sequelize.STRING),
  createdAt: sequelize.Sequelize.DATE,
  updatedAt: sequelize.Sequelize.DATE,
})

const findFile = async ({ team, id }) => File.findOne({ where: { team, slackFileId: id } })
const createFile = async ({ team, id, s3Key, sharedIn }) => File.create({ team, slackFileId: id, s3Key, sharedIn })
const updateFile = async ({ team, id, s3Key, sharedIn }) => File.update({ s3Key, sharedIn }, { where: { team, slackFileId: id } })

export {
  findFile,
  createFile,
  updateFile,
}
