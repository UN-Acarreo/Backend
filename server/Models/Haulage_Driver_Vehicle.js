const Sequelize = require('sequelize');
const DataBase = require('../DataBase/database.js');
const  Haulage = require("./Haulage");
const  Driver_Vehicle = require("./Driver_Vehicle");

const Haulage_Driver_Vehicle = DataBase.define('Haulage_Driver_Vehicle', {
    // attributes
    Id_haulage: {
        type: Sequelize.INTEGER,
        references: {
            model: Haulage, 
            key: 'Id_haulage'
          }
    },
    Id_driver: {
        type: Sequelize.INTEGER,
        references: {
            model: Driver_Vehicle, 
            key: 'Id_driver'
          }
    },
    Id_vehicle: {
        type: Sequelize.INTEGER,
        references: {
            model: Driver_Vehicle, 
            key: 'Id_vehicle'
          }
    },
    Is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
    }, {
        freezeTableName: true,
    });

Haulage.belongsToMany(Driver_Vehicle, { through: 'Haulage_Driver_Vehicle' });
Driver_Vehicle.belongsToMany(Haulage, { through: 'Haulage_Driver_Vehicle' });
module.exports = Haulage_Driver_Vehicle;