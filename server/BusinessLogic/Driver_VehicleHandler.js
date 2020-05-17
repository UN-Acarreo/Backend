const Driver_VehicleController=require('../Controllers/Driver_VehicleController')

async function createDriver_Vehicle( Id_driver, Id_vehicle, Is_owner ) {

    // Create Driver_Vehicle
    let result = await Driver_VehicleController.create(Id_driver, Id_vehicle, Is_owner)
    logger.info("Driver_VehicleController: Driver_Vehicle was created successfully.");
    if(result.status==1)
        return 1;
    logger.error("Driver_VehicleController: " + error);
    return error;
}
module.exports = { 
    createDriver_Vehicle: createDriver_Vehicle
    };
  