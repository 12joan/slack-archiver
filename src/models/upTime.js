import sequelize from './sequelize.js'

const UpTime = sequelize.define('uptime', {
  id: {
    type: sequelize.Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  instance: sequelize.Sequelize.STRING,
  lastActiveAt: sequelize.Sequelize.DATE,
  errorCount: sequelize.Sequelize.INTEGER,
  createdAt: sequelize.Sequelize.DATE,
  updatedAt: sequelize.Sequelize.DATE,
})

const currentUpTime = await UpTime.create({
  instance: process.env.INSTANCE_ID ?? '<no instance id>',
  lastActiveAt: new Date(),
})

const updateUpTime = ({ wasError }) => {
  if (wasError)
    currentUpTime.errorCount++

  currentUpTime.lastActiveAt = new Date()

  return currentUpTime.save()
}

export {
  updateUpTime,
}
