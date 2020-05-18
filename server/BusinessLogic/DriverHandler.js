// Import logger
const logger = require('./../utils/logger/logger');

//Controller definition
const DriverController = require('../Controllers/DriverController');

//Handler definition
const Driver_VehicleHandler = require('./Driver_VehicleHandler')

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


// Validate Driver
//status 0 = Driver not found
//status 1 = Driver found, id returned
//status -1 = error in DriverModel.count, error message returned
//status -2 = error in DriverModel.findAll from getDriverByEmail, error message returned
async function validateDriver(req) {
  // Get atributes
  const { Driver_Email, Driver_password } = req.body.request;

  // Validate Driver
  //count = await DriverModel.count({ where: { Driver_Email: Driver_Email, Driver_password: Driver_password } })
  count = await DriverController.countWhere({Driver_Email:Driver_Email})
  if(count.status!=1)
  {
      logger.error("DriverHandler: " + error);
      return {status: -1, data: error};
  }
  if (count.data > 0) {
      logger.info("DriverHandler: email match");
      let driver =await DriverController.getRegisterBy({Driver_Email:Driver_Email})
      if(driver.status==1)
      {
          //Compare hashed passwords
          if(bcrypt.compareSync(Driver_password, driver.data.Driver_password) == false){
          return {status: 0, data: 'Las contraseñas no coinciden'};
          }
          logger.info("DriverHandler: succesfull call to getDriverByEmail")
          return {status: 1, data: driver.data};
      }else if(status==-1)
      {    logger.error("DriverHandler: error from getDriverBeEmail"+ error)
          return {status: -2, data: driver.error};
      }
  }
      logger.info("DriverHandler: Driver is not valid");
      return {status: 0, data: false};  ;
}

async function chooseFreeDriver(Id_vehicle)
{
  let drivers = await Driver_VehicleHandler.getDriversByVehicleId(Id_vehicle);
  if(drivers.status!=1){
    logger.error("DriverHandler: Cant get list of drivers");
    return {status: -1, error: drivers.error};
  }
  //needs to check if drivers are bussy at hour of haulage
  
  return {status:1, data: drivers.data[0]};
  
}

module.exports = {
    chooseFreeDriver : chooseFreeDriver,
    validateDriver: validateDriver,
    createDriver : createDriver
  };