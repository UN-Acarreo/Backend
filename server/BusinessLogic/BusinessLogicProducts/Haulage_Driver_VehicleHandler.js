
// Import ControllerFactory
ControllerFactory = require('../../Controllers/ControllerFactory');

// Import logger
const logger = require('../../utils/logger/logger');

// create all Haulage_Driver_Vehicle from list
async function createAllHaulage_Driver_VehicleFromList(list_driver_vehicles,Id_haulage){

    for (const element of list_driver_vehicles) {
        let new_h_d_v = await ControllerFactory.getController("Haulage_Driver_Vehicle").create(
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

// get list of bussy DriverVehicle
async function getListOfBussyDriverVehicle() {
    let list = await ControllerFactory.getController("Haulage_Driver_Vehicle").getRegisterBy({ Is_active: "true" })
    if(list.status==1)
    {
        logger.info("Haulage_Driver_VehicleHandler: list of bussy drivers and vehicles list returned successfully.");
        return {status: 1, data: list};
    }
    else{
        logger.error("Haulage_Driver_VehicleHandler: Error getting list:"+error);
        return {status: -1, error: error};
    }      
}

module.exports ={
    createAllHaulage_Driver_VehicleFromList : createAllHaulage_Driver_VehicleFromList,
    getListOfBussyDriverVehicle : getListOfBussyDriverVehicle
}