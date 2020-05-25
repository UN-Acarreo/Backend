
// Import ModelFactory
ModelFactory = require('../../Models/ModelFactory');

// Import logger
const logger = require('../../utils/logger/logger');

// Create Vehicle
async function create(Plate, Brand, Model, Payload_capacity, Photo) {

    try {

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
        return {status: 1, data: result.Id_vehicle}
        /*
        logger.info("VehicleController: Vehicle was created successfully.");
        return 1;*/

    } catch (error) {
        logger.error("VehicleController: " + error);
        return {status: -1, error: error};
    }
}

// get all vehicles
async function getAll()
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
        return {status: -1, error: error};
    }
}

async function getRegisterByPk(Pk,attributes)
{
    try {
        let vehicle = await ModelFactory.getModel("Vehicle").findByPk(Pk,
            { 
                attributes: attributes,
                raw: true
            })
        logger.info("VehicleController: list was returned successfully.");
        console.log("driver: ")
        console.log(vehicle)
        return {status: 1, data:vehicle}
        
    } catch (error) {
        logger.error("VehicleController: " + error);
        return {status: -1, error: error};
    }
}

module.exports = { 
    create: create,
    getAll: getAll,
    getRegisterByPk: getRegisterByPk 
};
