const Sequelize = require('sequelize');
const DataBase = require('../DataBase/database.js');
const Cargo = require("./Cargo");
const Rating = require("./Rating");
const Route = require("./Route");
const Status = require("./Route");
const User = require("./User")

const Haulage = DataBase.define('Haulage', {
    // attributes
    Id_haulage: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    Id_user: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    Id_route: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    Id_cargo: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    Id_rating: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    Id_status: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    Date: {
        type: Sequelize.DATE,
        allowNull: false
    }
    }, {
        freezeTableName: true,
    });

// Skip primaryKey manual insertion
User.removeAttribute('Id_haulage');

Haulage.hasOne(Cargo,{foreignKey: "Id_cargo", sourceKey: "Id_cargo"});
Cargo.belongsTo(Haulage,{foreignKey: "Id_cargo", targetKey: "Id_cargo"});

Haulage.hasOne(Rating,{foreignKey: "Id_rating", sourceKey: "Id_rating"});
Rating.belongsTo(Haulage,{foreignKey: "Id_rating", targetKey: "Id_rating"});

Haulage.hasOne(Route,{foreignKey: "Id_route", sourceKey: "Id_route"});
Route.belongsTo(Haulage,{foreignKey: "Id_route", targetKey: "Id_route"});

Haulage.belongsTo(Status,{foreignKey: "Id_status", sourceKey: "Id_status"});
Status.hasMany(Haulage,{foreignKey: "Id_status", targetKey: "Id_status"});

Haulage.belongsTo(User,{foreignKey: "Id_user", sourceKey: "Id_user"});
User.hasMany(Haulage,{foreignKey: "Id_user", targetKey: "Id_user"});

module.exports = Haulage;