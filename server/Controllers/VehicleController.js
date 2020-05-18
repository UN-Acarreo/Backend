
// Import ModelFactory
ModelFactory = require('../Models/ModelFactory');

// Import logger
const logger = require('./../utils/logger/logger');

// Create Vehicle
async function createVehicle(req) {

    try {

        // Get atributes
        const { Plate, Brand, Model, Payload_capacity, Photo } = req.body.request;

        // Create Vehicle
        var result = await ModelFactory.getModel("Vehicle").create(
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
async function getListOfVehicles()
{
    try {
        let vehicles = await ModelFactory.getModel("Vehicle").findAll(
            { 
                attributes: ['Id_vehicle','Payload_capacity'],
                raw: true,
                //include: [{model:VehicleModel, atributes: ["Payload_capacity"]}]
            })
        logger.info("VehicleController: list was returned successfully.");
        return {status: 1, data:vehicles}
        
    } catch (error) {
        logger.error("VehicleController: " + error);
        return {status: -1, message: error};
    }
}
module.exports = { 
    createVehicle: createVehicle,
    getListOfVehicles : getListOfVehicles 
};
