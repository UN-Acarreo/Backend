const Sequelize = require('sequelize');
const DataBase = require('../DataBase/database.js');
const Haulage = require("./Haulage");

const Bill = DataBase.define('Bill', {
    // attributes
    Id_bill: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    Amount: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    Id_haulage: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
    }, {
        freezeTableName: true,
    });
    
Haulage.hasOne(Bill,{foreignKey: "Id_haulage", sourceKey: "Id_haulage"});
Bill.belongsTo(Haulage,{foreignKey: "Id_haulage", targetKey: "Id_haulage"});
module.exports = Bill;