
// Import model
const VehicleModel = require('../Models/Vehicle');

// Import logger
const logger = require('./../utils/logger/logger');

// Create Vehicle
async function createVehicle(req) {

    try {

        // Get atributes
        const { Plate, Brand, Model, Payload_capacity, Photo } = req.body.request;

        // Create Vehicle
        var result = await VehicleModel.create(
            {
                Plate: Plate,
                Brand: Brand,
                Model: Model,
                Payload_capacity: Payload_capacity,
                Photo: Photo
            }
        )

        logger.info("VehicleController: Vehicle was created successfully.");
        return {status: 1, id: result.Id_vehicle}
        /*
        logger.info("VehicleController: Vehicle was created successfully.");
        return 1;*/

    } catch (error) {
        logger.error("VehicleController: " + error);
        return {status: -1, message: error};
    }

}
module.exports = { createVehicle: createVehicle };
