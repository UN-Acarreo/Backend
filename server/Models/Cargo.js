const Sequelize = require('sequelize');
const DataBase = require('../DataBase/database.js');

const Cargo = DataBase.define('Cargo', {
    // attributes
    Id_cargo: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    Weight: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    Description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Comments: {
        type: Sequelize.STRING,
        allowNull: true
    }
  }, {
    freezeTableName: true,
  });

// Skip primaryKey manual insertion
Cargo.removeAttribute('Id_cargo');

module.exports = Cargo;
