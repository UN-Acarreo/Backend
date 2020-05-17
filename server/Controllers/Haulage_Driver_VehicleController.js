
// Import model
const Haulage_Driver_VehicleModel = require('../Models/Haulage_Driver_Vehicle');

// Import logger
const logger = require('./../utils/logger/logger');

// Create Haulage_Driver_Vehicle
async function createHaulage_Driver_Vehicle(Id_haulage, Id_driver, Id_vehicle, Is_active) {

    try {


        // Create Haulage_Driver_Vehicle
        await Haulage_Driver_VehicleModel.create(
            {
                Id_haulage: Id_haulage,
                Id_driver: Id_driver,
                Id_vehicle: Id_vehicle,
                Is_active: Is_active
            }
        );
        logger.info("Haulage_Driver_VehicleController: Haulage_Driver_Vehicle was created successfully.");
        return {status:1};
        
    } catch (error) {
        logger.error("Haulage_Driver_VehicleController: " + error);
        return {status:-1,error:error};
    }

}

async function createAllHaulage_Driver_VehicleFromList(list_driver_vehicles,Id_haulage){

   
    list_driver_vehicles.forEach( async function(element) {
        let new_h_d_v = await createHaulage_Driver_Vehicle(
            Id_haulage, element.Id_driver, element.Id_vehicle, false
            )  
        if(new_h_d_v.status==-1)
        {
                logger.error("Haulage_Driver_VehicleController: " + error);
                return {status:-1,error:error};
        }
    });
    logger.info("Haulage_Driver_VehicleController: all registers were created successfully.");
    return {status:1};
}

async function getListOfBussyDriverVehicle() {
    
    try {
        
        let list = await Haulage_Driver_VehicleModel.findAll(
            { 
                where: { Is_active: "true" },
                attributes: ['Id_driver','Id_vehicle']
            });
        logger.info("Haulage_Driver_VehicleController: list of bussy drivers and vehicles list returned successfully.");
        return {status: 1, data: list};
    } catch (error) {
        logger.error("Haulage_Driver_VehicleController: Error getting list:"+error);
        return {status: -1, error: error};
    }
        
}
module.exports = { 
    createHaulage_Driver_Vehicle: createHaulage_Driver_Vehicle, 
    getListOfBussyDriverVehicle: getListOfBussyDriverVehicle,
    createAllHaulage_Driver_VehicleFromList : createAllHaulage_Driver_VehicleFromList
 };
