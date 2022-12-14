'use strict';
module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'User2s', // table name
        'last_name', // new field name
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
        'nickName',
        {
          type: Sequelize.STRING,
          allowNull: true,
        }
      ),
    ]);
  },

  down(queryInterface, Sequelize) {
    // logic for reverting the changes
    return Promise.all([
      queryInterface.removeColumn('User2s', 'last_name', 'nickName'),
    ]);
  },
};