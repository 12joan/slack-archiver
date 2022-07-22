module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.sequelize.transaction(async t => {
    await queryInterface.createTable('messages', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      channel: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ts: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      data: {
        type: Sequelize.JSON,
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

    await queryInterface.addIndex('messages', ['channel', 'ts'], { unique: true })
  }),

  down: queryInterface => queryInterface.dropTable('messages'),
}
