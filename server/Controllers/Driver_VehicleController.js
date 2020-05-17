
// Import model
const Driver_VehicleModel = require('../Models/Driver_Vehicle');
const DriverModel = require('../Models/Driver');

//import vehicle model
const VehicleModel = require('../Models/Vehicle');
// Import logger
const logger = require('./../utils/logger/logger');

// Create Driver_Vehicle
async function createDriver_Vehicle( Id_driver, Id_vehicle, Is_owner ) {

    try {

        // Get atributes
        //const { Id_driver, Id_vehicle, Is_owner } = req.body.request;

        // Create Driver_Vehicle
        await Driver_VehicleModel.create(
            {
                Id_driver: Id_driver,
                Id_vehicle: Id_vehicle,
                Is_owner: Is_owner
            }
        )
        logger.info("Driver_VehicleController: Driver_Vehicle was created successfully.");
        return 1;

    } catch (error) {
        logger.error("Driver_VehicleController: " + error);
        return error;
    }
}

async function getDriversByVehicleId(Id_vehicle)
{
    try {

        let drivers = await Driver_VehicleModel.findAll({
            where: {Id_vehicle : Id_vehicle},
            raw:true
        })
        logger.info("Driver_VehicleController: list of driver returned.");
        return {status:1,data:drivers};
        
    } catch (error) {
        logger.error("Driver_VehicleController: " + error);
        return error;
    }
    
}

// Get Vehicle by Driver Id
//status 0 = Driver not found
//status 1 = Driver found, Driver returned
//status -1 = error, error message returned
async function getVehicleByDriverId(id)
{
    //query to find Driver by given email (which is unique)
    try {
        let drivers = await DriverModel.findAll(
            { where: { Id_driver: id }, 
              attributes: [],
              include: [{ model: VehicleModel, attributes: ['Plate', 'Brand', 'Model', 'Payload_capacity', 'Photo']}]
            }
        )
        
        //query returns array of Drivers that match were clause
        if(drivers.length==0)
        {
            logger.info("Driver_VehicleController: id doesnt match known Driver with Vehicle")
            return {status:0, data:"not found"}
        }
        else{
            logger.info("Driver_VehicleController: Driver vehicle found")
            //Drivers[0] should be the only Driver in array, .dataValues is Json containing atributes
            return {status: 1,data: drivers[0].dataValues} 
        }
              
    } catch (error) {
        logger.info("Driver_VehicleController: "+ error)
        return {status:-1, data:error}
        
    }

}
module.exports = { 
  createDriver_Vehicle: createDriver_Vehicle,
  getVehicleByDriverId: getVehicleByDriverId,
  getDriversByVehicleId:getDriversByVehicleId};
