
// Import model
const RouteModel = require('../Models/Route');

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
        return 1;
        
    } catch (error) {
        return error;
    }

}
module.exports = { createRoute: createRoute };
