const Sequelize = require('sequelize');
const DataBase = require('../DataBase/database.js');

const Vehicle = DataBase.define('Vehicle', {
    // attributes
    Id_vehicle: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    Plate: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
    },
    Brand: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Model: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Payload_capacity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    Photo: {
        type: Sequelize.STRING,
        allowNull: false
    }
    }, {
        freezeTableName: true,
    });

// Skip primaryKey manual insertion
User.removeAttribute('Id_vehicle');

module.exports = Vehicle;