'use strict';
//status description must be unique, this file allows to add or remove unique constraint
module.exports = {
  up: (queryInterface, Sequelize) => {
    //adding constraint
    return Promise.all([
      queryInterface.addConstraint('Status', ['Status_description'], {
        type: 'unique',
        name: 'Status_description_unique'
      })
    ])
  },

  down: (queryInterface, Sequelize) => {
    //removing constraint
    return Promise.all([
      queryInterface.removeConstraint("Status", "unique_Status_description")
    ])
  
  }
};
