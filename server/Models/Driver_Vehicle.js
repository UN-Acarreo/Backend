const Sequelize = require('sequelize');
const DataBase = require('../DataBase/database.js');
const Driver = require("./Driver");
const Vehicle = require("./Vehicle");

const Driver_Vehicle = DataBase.define('Driver_Vehicle', {
    // attributes
    Id_driver: {
        type: Sequelize.INTEGER,
        references: {
            model: Driver, 
            key: 'Id_driver'
          }
    },
    Id_vehicle: {
        type: Sequelize.INTEGER,
        references: {
            model: Vehicle, 
            key: 'Id_vehicle'
          }
    },
    Is_owner: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
    }, {
        freezeTableName: true,
    });

// Add Composite Primary Key
DataBase.addConstraint('Driver_Vehicle', ['Id_driver', 'Id_vehicle'], {
    type: 'primary key',
    name: 'Driver_Vehicle_pkey'
    });

Vehicle.belongsToMany(Driver, { through: 'Driver_Vehicle' });
Driver.belongsToMany(Vehicle, { through: 'Driver_Vehicle' });

module.exports = Driver_Vehicle;