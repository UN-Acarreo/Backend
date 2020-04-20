const Sequelize = require('sequelize');
const DataBase = require('../DataBase/database.js');

const Route = DataBase.define('Route', {
    // attributes
    Id_route: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    Origin_coord: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Destination_coord: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Duration: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
    }, {
        freezeTableName: true,
    });

// Skip primaryKey manual insertion
Route.removeAttribute('Id_route');

module.exports = Route;
