const Sequelize = require('sequelize');
const sequelize = require('../DataBase/database.js');

const User = sequelize.define('User', {
    // attributes
    Id_user: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    User_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    User_last_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      User_password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      User_address: {
        type: Sequelize.STRING,
        allowNull: false
      },
      User_Email: {
        type: Sequelize.STRING,
        allowNull: false
      }
  }, {
    freezeTableName: true,
  });

  module.exports = User;