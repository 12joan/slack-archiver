module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.sequelize.transaction(async t => {
    await queryInterface.createTable('access_tokens', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      team: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      token: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      scope: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      data: {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: {},
      },
      expiresAt: {
        type: Sequelize.DATE,
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

    await queryInterface.addIndex('access_tokens', ['token'], { unique: true })
  }),

  down: queryInterface => queryInterface.dropTable('access_tokens'),
}
