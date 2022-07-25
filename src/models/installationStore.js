import sequelize from './sequelize.js'

const Installation = sequelize.define('installation', {
  id: {
    type: sequelize.Sequelize.STRING,
    primaryKey: true,
  },
  data: sequelize.Sequelize.JSON,
  createdAt: sequelize.Sequelize.DATE,
  updatedAt: sequelize.Sequelize.DATE,
})

const findInstallation = id => Installation.findOne({ where: { id } })

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

  fetchInstallation: installQuery => findInstallation(
    installQuery.enterpriseId ?? installQuery.teamId
  ),

  deleteInstallation: installQuery => {
    const enterpriseOrTeamId = installQuery.enterpriseId ?? installQuery.teamId
    return Installation.destroy({ where: { id: enterpriseOrTeamId } })
  },
}

export default installationStore

export {
  findInstallation,
}
