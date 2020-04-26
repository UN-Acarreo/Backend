'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return Promise.all([
      queryInterface.bulkInsert('Status', [{Status_description: 'In progress'}], {}),
      queryInterface.bulkInsert('Status', [{Status_description: 'Reserved'}], {}),
      queryInterface.bulkInsert('Status', [{Status_description: 'Cancelled'}], {}),
      queryInterface.bulkInsert('Status', [{Status_description: 'Done'}], {})
    ])
   
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return Promise.all([
    queryInterface.bulkDelete('Status', null, {})
    
  ])
  }
};
