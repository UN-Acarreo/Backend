const Sequelize = require('sequelize');
const DataBase = require('../DataBase/database.js');

const Status = DataBase.define('Status', {
    // attributes
    Id_status: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    Status_description: {
        type: Sequelize.STRING,
        allowNull: false
    }
    }, {
        freezeTableName: true,
    });

// Skip primaryKey manual insertion
Status.removeAttribute('Id_status');

module.exports = Status;
