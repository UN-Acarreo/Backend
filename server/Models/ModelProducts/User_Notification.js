
const Sequelize = require('sequelize');
const DataBase = require('../../DataBase/database.js');

const Haulage = require("./Haulage");
const Notification_Type = require("./Notification_Type");

// Define Notifiaction type Model
const User_Notification = DataBase.define('User_Notification', {
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
User_Notification.belongsTo(Notification_Type,{foreignKey: "Id_Notification_Type", sourceKey: "Id_Notification_Type"});
Notification_Type.hasMany(User_Notification,{foreignKey: "Id_Notification_Type", sourceKey: "Id_Notification_Type"});

User_Notification.belongsTo(Haulage,{foreignKey: "Id_haulage", sourceKey: "Id_haulage"});
Haulage.hasMany(User_Notification,{foreignKey: "Id_haulage", sourceKey: "Id_haulage"});

module.exports = User_Notification;
