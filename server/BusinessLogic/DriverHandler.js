// Import logger
const logger = require('./../utils/logger/logger');
//Controller definition
const Driver_Vehicle_Controller = require('../Controllers/Driver_VehicleController');

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
    chooseFreeDriver : chooseFreeDriver
  };