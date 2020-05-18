
// Import ModelFactory
ModelFactory = require('../Models/ModelFactory');

// Import logger
const logger = require('./../utils/logger/logger');


//import cargoModel
const cargoModel =require('../Models/Cargo');

//import routeController
const RouteController =require('./RouteController');


//importing description values
const descprition = require('../constants');

//import cargoController
const CargoController = require('../Controllers/CargoController');

// Create Haulage
//returns status 1 if created succesfully, data is new haulage
//returns status -1 if error
async function create(req) {

    try {
        // Get atributes
        const { Date, Id_user, Id_route, Id_cargo} = req;
        
        // Create Haulage
        let new_haulage = await ModelFactory.getModel("Haulage").create(
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
         return {status: -1, error:error};
    }
}
/*
//returns status 1 and weight of haulage's cargo, -1 and error if not succesfull
async function getWeight(Id_haulage){
    try{

        let weight = await ModelFactory.getModel("Haulage").findByPk(Id_haulage,
            {
                attributes: [],
                //raw:true,
                include: [{ model: ModelFactory.getModel("Cargo"), attributes: ['Weight']}]
            }
        )
        //console.log(weight.dataValues)
        logger.info("HaulageController: weight was found successfully.");
        return {status: 1, data: weight.dataValues.Cargo.dataValues.Weight};
    }catch(error) {
        logger.error("HaulageController: " + error);
        return {status: -1, error:error};
    }

} 
*/
module.exports = { 
    create: create
};


