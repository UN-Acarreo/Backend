
// Import ModelFactory
ModelFactory = require('../Models/ModelFactory');

// Import logger
const logger = require('./../utils/logger/logger');

// Create Haulage_Driver_Vehicle
async function create(Id_haulage, Id_driver, Id_vehicle, Is_active) {

    try {


        // Create Haulage_Driver_Vehicle
        await ModelFactory.getModel("Haulage_Driver_Vehicle").create(
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


async function getRegisterBy(query) {
    
    try {
        
        let list = await ModelFactory.getModel("Haulage_Driver_Vehicle").findAll(
            { 
                where: query,
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
    create: create, 
    getRegisterBy: getRegisterBy
 };
