
// Import ModelFactory
ModelFactory = require('../Models/ModelFactory');

// Import logger
const logger = require('./../utils/logger/logger');

// Create Status
async function createStatus(req) {

    try {

        // Get atributes
        const { status_description } = req.body.request;

        // Create Status
        await ModelFactory.getModel("Status").create(
            {
                status_description: status_description
            }
        );
        logger.info("StatusController: Status was created successfully.");
        return 1;
        
    } catch (error) {
        logger.error("StatusController: " + error);
        return error;
    }

}
module.exports = { createStatus: createStatus };
