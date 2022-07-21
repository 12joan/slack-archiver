import sequelize from './sequelize.js'

const UpTime = sequelize.define('UpTime', {
  instance: {
    type: sequelize.Sequelize.STRING,
    allowNull: false,
  },
  lastActiveAt: {
    type: sequelize.Sequelize.DATE,
    allowNull: false,
  },
  errorCount: {
    type: sequelize.Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
}, {
  indexes: [
    {
      unique: false,
      fields: ['instance'],
    },
  ],
})

await UpTime.sync({ alter: true })

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
