module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.sequelize.transaction(async t => {
    await queryInterface.createTable('files', {
      id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      team: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      s3Key: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      sharedIn: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    })

    await queryInterface.addIndex('files', ['team', 'id'], { unique: true })
  }),

  down: queryInterface => queryInterface.dropTable('files'),
}
