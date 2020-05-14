
// Import model
const Driver_VehicleModel = require('../Models/Driver_Vehicle');

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

module.exports = { 
    createDriver_Vehicle: createDriver_Vehicle};
