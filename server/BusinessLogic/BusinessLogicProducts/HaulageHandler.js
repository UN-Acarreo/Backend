
// Import ControllerFactory
ControllerFactory = require('../../Controllers/ControllerFactory');

// Import logger
const logger = require('../../utils/logger/logger');

//returns status 1 if created succesfully, data is new haulage
//returns status -1 if cargo could not be created, error is returns as well
//returns status -2 if rout could not be created, error is returns as well
//returns status -3 if route and cargo were created but not haulage, error is returns as well
async function createHaulageWithRouteCargo(values)
{
    let route = await ControllerFactory.getController("Route").create({
        Origin_coord: values.Origin_coord, Destination_coord: values.Destination_coord,Duration: values.Duration
      });
      if(route.status==1)
      {
        //route created, creating cargo
        let cargo = await ControllerFactory.getController("Cargo").create({
          Weight: values.Weight, Description: values.Description, Comments: values.Comments
        });
        if(cargo.status==1)
        {
          //cargo created, creating haulage
          let date = new Date(values.Date.Year,values.Date.Month,values.Date.Day,values.Date.Hour,values.Date.Minute)
          let haulage = await ControllerFactory.getController("Haulage").create({
            Date: date, Id_user: values.Id_user, Id_route: route.data, Id_cargo: cargo.data
          });
          if(haulage.status == 1)
          {
            logger.info("HaulageHandler: cargo and route of haulage created successfully")
            return{status:1,data:haulage.data};
          }
          else{
            logger.error("HaulageHandler: Could not create haulage: "+ haulage.error)
            return{status:-3,data:haulage.error};
          }
        }
        else{
          logger.error("HaulageHandler: Could not create cargo of haulage: "+ cargo.error)
          return{status:-1,error:cargo.error};
        }
      }
      else
      {
        logger.error("HaulageHandler: Could not create route haulage: "+ route.error)
        return{status:-2,error:route.error};
      }
}

module.exports = { 
    createHaulageWithRouteCargo: createHaulageWithRouteCargo
    };
  