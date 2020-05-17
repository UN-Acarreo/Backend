
// Import model
const HaulageModel = require('../Models/Haulage');

// Import logger
const logger = require('./../utils/logger/logger');

//import routeController
const RouteController =require('./RouteController');

//import cargoModel
const cargoModel =require('../Models/Cargo');

//importing description values
const descprition = require('../constants');

//import cargoController
const CargoController = require('../Controllers/CargoController');

// Create Haulage
//returns status 1 if created succesfully, data is new haulage
//returns status -1 if error
async function createHaulage(req) {

    try {
        // Get atributes
        const { Date, Id_user, Id_route, Id_cargo} = req;
        
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
         return {status: -1, error:error};
    }
}

//returns status 1 if created succesfully, data is new haulage
//returns status -1 if cargo could not be created, error is returns as well
//returns status -2 if rout could not be created, error is returns as well
//returns status -3 if route and cargo were created but not haulage, error is returns as well
async function createHaulageWithRouteCargo(values)
{
    let route = await RouteController.createRoute({
        Origin_coord: values.Origin_coord, Destination_coord: values.Destination_coord
      });
      if(route.status==1)
      {
        //route created, creating cargo
        let cargo = await CargoController.createCargo({
          Weight: values.Weight, Description: values.Description, Comments: values.Comments
        });
        if(cargo.status==1)
        {
          //cargo created, creating haulage
          let haulage = await createHaulage({
            Date: values.Date, Id_user: values.Id_user, Id_route: route.data, Id_cargo: cargo.data
          });
          if(haulage.status == 1)
          {
            logger.info("HaulageController: cargo and route of haulage created successfully")
            return{status:1,data:haulage.data};
          }
          else{
            logger.error("HaulageController: Could not create haulage: "+ haulage.error)
            return{status:-3,data:haulage.error};
          }
        }
        else{
          logger.error("HaulageController: Could not create cargo of haulage: "+ cargo.error)
          return{status:-1,error:cargo.error};
          
        }
      }
      else
      {
        logger.error("HaulageController: Could not create route haulage: "+ route.error)
        return{status:-2,error:route.error};
      }
}


//returns status 1 and weight of haulage's cargo, -1 and error if not succesfull
async function getWeight(Id_haulage){
    try{

        let weight = await HaulageModel.findByPk(Id_haulage,
            {
                attributes: [],
                //raw:true,
                include: [{ model: cargoModel, attributes: ['Weight']}]
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
module.exports = { 
    createHaulage: createHaulage,
    getWeight : getWeight,
    createHaulageWithRouteCargo : createHaulageWithRouteCargo
};


