
const Sequelize = require('sequelize');
const DataBase = require('../../DataBase/database.js');

const Haulage = require("./Haulage");
const Notification_Type = require("./Notification_Type");

// Define Notifiaction type Model
const Driver_Notification = DataBase.define('Driver_Notification', {
    // attributes
    Id_haulage: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    Id_Notification_Type: {
        type: Sequelize.INTEGER,
        primaryKey: true
    }
    }, {
        freezeTableName: true,
    });

// Establish relations
Driver_Notification.belongsTo(Notification_Type,{foreignKey: "Id_Notification_Type", sourceKey: "Id_Notification_Type"});
Notification_Type.hasMany(Driver_Notification,{foreignKey: "Id_Notification_Type", sourceKey: "Id_Notification_Type"});

Driver_Notification.belongsTo(Haulage,{foreignKey: "Id_haulage", sourceKey: "Id_haulage"});
Haulage.hasMany(Driver_Notification,{foreignKey: "Id_haulage", sourceKey: "Id_haulage"});

module.exports = Driver_Notification;
