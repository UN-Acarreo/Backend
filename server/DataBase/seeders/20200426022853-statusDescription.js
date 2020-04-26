'use strict';
//there are 4 types of possibles status, this file can insert them all (or delete them all)
module.exports = {
  up: (queryInterface, Sequelize) => {
    //inserting
    return Promise.all([
      queryInterface.bulkInsert('Status', [{Status_description: 'In progress'}], {}),
      queryInterface.bulkInsert('Status', [{Status_description: 'Reserved'}], {}),
      queryInterface.bulkInsert('Status', [{Status_description: 'Cancelled'}], {}),
      queryInterface.bulkInsert('Status', [{Status_description: 'Done'}], {})
    ])
   
  },

  down: (queryInterface, Sequelize) => {
    //deleting
   return Promise.all([
    queryInterface.bulkDelete('Status', null, {})
    
  ])
  }
};
