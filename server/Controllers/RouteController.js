
// Import model
const RouteModel = require('../Models/Route');

// Import logger
const logger = require('./../utils/logger/logger');

// Create Route
async function createRoute(req) {

    try {

        // Get atributes
        const { Origin_coord, Destination_coord } = req.body.request;

        // Create Route
        const new_route = await RouteModel.create(
            {
                Origin_coord: Origin_coord,
                Destination_coord: Destination_coord,
                Duration: 2 //Hardcoding 2 hours by default for now
            }
        );
        logger.info("RouteController: Route was created successfully.");
        return {status: 1, data: new_route.Id_route};  
        
    } catch (error) {
        logger.error("RouteController: " + error);
        return {status: -1, error: error};
    }

}
module.exports = { createRoute: createRoute };



