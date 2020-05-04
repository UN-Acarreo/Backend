
// Import model
const CargoModel = require('../Models/Cargo');

// Import logger
const logger = require('./../utils/logger/logger');

// Create Cargo
async function createCargo(req) {

    try {

        // Get atributes
        const { Weight, Description, Comments } = req.body.request;

        // Create Cargo
        await CargoModel.create(
            {
                Weight: Weight,
                Description: Description,
                Comments: Comments
            }
        );
        logger.info("CargoController: Cargo was created successfully.");
        return 1;
        
    } catch (error) {
        logger.error("CargoController: " + error);
        return error;
    }

}
module.exports = { createCargo: createCargo };
