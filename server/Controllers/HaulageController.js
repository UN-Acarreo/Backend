
// Import model
const HaulageModel = require('../Models/Haulage');

// Import logger
const logger = require('./../utils/logger/logger');

//import routeController
const RouteController =require('./RouteController');

//importing description values
const descprition = require('../constants')

// Create Haulage
//returns status 1 if created succesfully, data is new haulage
//returns status -1 if route could not be created, error is returns as well
//returns status -2 if route was created but not haulage, error is returns as well
async function createHaulage(req) {

    try {

        // Get atributes
        const { Date, Id_user, Id_route, Id_cargo} = req;
        
        //Create route that will be used in haulage
        //let request_route ={Origin_coord:Origin_coord, Destination_coord:Destination_coord}
        //let req_route ={body:{request:request_route}};
        //let route_response = createRoute(req_route);
        
        // Create Haulage
        let new_haulage = await HaulageModel.create(
            {
                Date: Date,
                Id_user: Id_user,
                Id_route: Id_route,
                Id_cargo: Id_cargo,
                Id_status: descprition.status_description.WAITING_FOR_DRIVER
            }
        );
        logger.info("HaulageController: Haulage was created successfully.");
        return {status: 1, data: new_haulage};
        
    } catch (error) {
        logger.error("HaulageController: " + error);
         return {status: -2, error:error};
    }
}
module.exports = { createHaulage: createHaulage };


