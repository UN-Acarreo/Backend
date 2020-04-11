const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    'UN-Acarreo',
    'postgres',
    'admin',
    {
        host: 'localhost', // server name or IP address;
        dialect: 'postgres',
        pool:{
            max: 5,
            min: 0,
            require: 30000,
            idle: 10000
        },
        define: {
            // The `timestamps` field specify whether or not the `createdAt` and `updatedAt` fields will be created.
            // This was true by default, but now is false by default
            timestamps: false
          }
    }
)
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to data base has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
module.exports = sequelize;