
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
        let new_Cargo = await CargoModel.create(
            {
                Weight: Weight,
                Description: Description,
                Comments: Comments
            }
        );
        logger.info("CargoController: Cargo was created successfully.");
        return {status: 1, data: new_Cargo.Id_cargo};
        
    } catch (error) {
        logger.error("CargoController: " + error);
        return {status: -1, error: error};
    }

}
module.exports = { createCargo: createCargo };
