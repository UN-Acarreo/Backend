const Haulage_Driver_VehicleController = require('../Controllers/Haulage_Driver_VehicleController')

// Import logger
const logger = require('./../utils/logger/logger');

async function createAllHaulage_Driver_VehicleFromList(list_driver_vehicles,Id_haulage){


    for (const element of list_driver_vehicles) {
        let new_h_d_v = await Haulage_Driver_VehicleController.createHaulage_Driver_Vehicle(
            Id_haulage, element.Id_driver, element.Id_vehicle, false
            )  
        if(new_h_d_v.status==-1)
        {
                logger.error("Haulage_Driver_VehicleHandler: " + error);
                return {status:-1,error:error};
        }
      }
    logger.info("Haulage_Driver_VehicleHandler: all registers were created successfully.");
    return {status:1};
}
module.exports ={
    createAllHaulage_Driver_VehicleFromList : createAllHaulage_Driver_VehicleFromList
}