// Import logger
const logger = require('./../utils/logger/logger');

//Controller definition
const Driver_Vehicle_Controller = require('../Controllers/Driver_VehicleController');
const DriverController = require('../Controllers/DriverController');

//Used to hash password
var bcrypt = require('bcryptjs');

// Create Driver
async function createDriver(req) {
    // Get atributes
    //const { Driver_name, Driver_last_name, Driver_password, Driver_address, Driver_Email, Average_rating, Driver_photo, Driver_phone, Identity_card } = req.body.request;
    const { Driver_name, Driver_last_name, Driver_password, Driver_address, Driver_Email, Driver_phone, Identity_card, Driver_photo } = req.body.request;
    //Hash the password
    var Driver_password_hashed = bcrypt.hashSync(Driver_password, 10);
    // Create Driver
    var result = await DriverController.create(Driver_name, Driver_last_name, Driver_password_hashed, Driver_address, Driver_Email, Driver_phone, Identity_card, Driver_photo)
    if(result.status==1)
    {
      logger.info("DriverHandler: Driver was created successfully.");
      return {status: 1, data: result.data}
    }
    else{
      logger.error("DriverHandler: " + result.error);
      return {status: -1, message: result.error};
    }
}

async function chooseFreeDriver(Id_vehicle)
{
  let drivers = await Driver_Vehicle_Controller.getDriversByVehicleId(Id_vehicle);
  if(drivers.status!=1){
    logger.error("DriverHandler: Cant get list of drivers");
    return {status: -1, error: drivers.error};
  }
  //needs to check if drivers are bussy at hour of haulage
  
  return {status:1, data: drivers.data[0]};
  
}

module.exports = {
    chooseFreeDriver : chooseFreeDriver,
    createDriver : createDriver
  };