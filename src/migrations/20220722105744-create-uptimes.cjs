module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.sequelize.transaction(async t => {
    await queryInterface.createTable('uptimes', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      instance: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastActiveAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      errorCount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
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

    await queryInterface.addIndex('uptimes', ['instance'], { unique: false })
  }),

  down: queryInterface => queryInterface.dropTable('uptimes'),
}
