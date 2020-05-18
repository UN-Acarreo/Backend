
// Import model
const StatusModel = require('../Models/Status');

// Import logger
const logger = require('./../utils/logger/logger');

// Create Status
async function create(req) {

    try {

        // Get atributes
        const { status_description } = req.body.request;

        // Create Status
        await StatusModel.create(
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
module.exports = { create: create };
