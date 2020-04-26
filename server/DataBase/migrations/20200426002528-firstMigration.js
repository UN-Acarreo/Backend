'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.renameColumn("User","User_name","User_migration_name")])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.renameColumn("User","User_migration_name","User_name")])
  }
};
