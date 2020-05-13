
// Import model
const Haulage_Driver_VehicleModel = require('../Models/Haulage_Driver_Vehicle');

// Import logger
const logger = require('./../utils/logger/logger');

// Create Haulage_Driver_Vehicle
async function createHaulage_Driver_Vehicle(req) {

    try {

        // Get atributes
        const { Id_haulage, Id_driver, Id_vehicle, Is_active } = req.body.request;

        // Create Haulage_Driver_Vehicle
        await Haulage_Driver_VehicleModel.create(
            {
                Id_haulage: Id_haulage,
                Id_driver: Id_driver,
                Id_vehicle: Id_vehicle,
                Is_active: Is_active
            }
        );
        logger.info("Haulage_Driver_VehicleController: Haulage_Driver_Vehicle was created successfully.");
        return 1;
        
    } catch (error) {
        logger.error("Haulage_Driver_VehicleController: " + error);
        return error;
    }

}

module.exports = { createHaulage_Driver_Vehicle: createHaulage_Driver_Vehicle };
