module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction(async t => {
    await queryInterface.addColumn('messages', 'team', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '<no team>',
    })

    await queryInterface.addIndex('messages', ['team', 'channel', 'ts'], { unique: true })
  }),

  down: queryInterface => queryInterface.removeColumn('messages', 'team'),
}
