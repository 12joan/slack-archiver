import sequelize from './sequelize.js'

const Installation = sequelize.define('Installation', {
  id: {
    type: sequelize.Sequelize.STRING,
    primaryKey: true,
  },
  data: {
    type: sequelize.Sequelize.JSON,
    allowNull: false,
  },
})

await Installation.sync({ alter: true })

const installationStore = {
  storeInstallation: installation => {
    const enterpriseOrTeamId = (installation.enterprise ?? installation.team).id

    return Installation
      .findOne({ where: { id: enterpriseOrTeamId } })
      .then(existingInstallation => {
        if (existingInstallation)
          return existingInstallation.update({ data: installation })

        return Installation.create({
          id: enterpriseOrTeamId,
          data: installation,
        })
      })
  },

  fetchInstallation: installQuery => {
    const enterpriseOrTeamId = installQuery.enterpriseId ?? installQuery.teamId
    return Installation.findOne({ where: { id: enterpriseOrTeamId } })
  },

  deleteInstallation: installQuery => {
    const enterpriseOrTeamId = installQuery.enterpriseId ?? installQuery.teamId
    return Installation.destroy({ where: { id: enterpriseOrTeamId } })
  },
}

export default installationStore
