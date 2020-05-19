
// Import ModelFactory
ModelFactory = require('../../Models/ModelFactory');

// Import logger
const logger = require('../../utils/logger/logger');

// Create Cargo
async function create(req) {

    try {

        // Get atributes
        const { Weight, Description, Comments } = req;

        // Create Cargo
        let new_Cargo = await ModelFactory.getModel("Cargo").create(
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

module.exports = { create: create };
