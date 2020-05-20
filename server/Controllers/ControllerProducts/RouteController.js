
// Import ModelFactory
ModelFactory = require('../../Models/ModelFactory');

// Import logger
const logger = require('../../utils/logger/logger');

// Create Route
async function create(req) {

    try {

        // Get atributes
        const { Origin_coord, Destination_coord,Duration } = req;
        console.log("duracion")
        console.log(Duration)

        // Create Route
        const new_route = await ModelFactory.getModel("Route").create(
            {
                Origin_coord: Origin_coord,
                Destination_coord: Destination_coord,
                Duration: Duration 
            }
        );
        logger.info("RouteController: Route was created successfully.");
        return {status: 1, data: new_route.Id_route};  
        
    } catch (error) {
        logger.error("RouteController: " + error);
        return {status: -1, error: error};
    }

}

module.exports = { create: create };

/*
async function test(){

    let request_route ={Origin_coord:13241, Destination_coord:13134}
    let req_route ={body:{request:request_route}};
    let route_response = await createRoute(req_route);
    console.log(route_response);
}

test();
*/

