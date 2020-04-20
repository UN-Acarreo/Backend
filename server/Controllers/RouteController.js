
// Import model
const RouteModel = require('../Models/Route');

// Import logger
const logger = require('./../utils/logger/logger');

// Create Route
async function createRoute(req) {

    try {

        // Get atributes
        const { Origin_coord, Destination_coord, Duration } = req.body.request;

        // Create Route
        await RouteModel.create(
            {
                Origin_coord: Origin_coord,
                Destination_coord: Destination_coord,
                Route_password: password,
                Duration: Duration
            }
        );
        logger.info("RouteController: Route was created successfully.");
        return 1;
        
    } catch (error) {
        logger.error("RouteController: " + error);
        return error;
    }

}
module.exports = { createRoute: createRoute };
