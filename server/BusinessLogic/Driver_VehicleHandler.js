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

async function getVehicleByDriverId(id)
{
    //query to find Vehicles by given drivers Id

    let vehicle = await Driver_VehicleController.getRegisterBy({Id_driver: id},"Vehicle")  
    
    if(vehicle.status==1)
    {
        //query returns array of Drivers that match were clause
        if(vehicle.data.length==0)
        {
            logger.info("Driver_VehicleHandler: id doesnt match known Driver with Vehicle")
            return {status:0, data:"not found"}
        }
        else{
            logger.info("Driver_VehicleHandler: Driver vehicle found")
            return {status: 1, data: vehicle.data} 
        }
    }      
    else{
        
        logger.error("Driver_VehicleHandler: "+ vehicle.error)
        return {status:-1, error:vehicle.error}
    }

}
async function getDriversByVehicleId(Id_vehicle){
    //query to find Vehicles by given drivers Id

    let drivers = await Driver_VehicleController.getRegisterBy({Id_vehicle : Id_vehicle},"Driver")  
    
    if(drivers.status==1)
    {
        //query returns array of Drivers that match were clause
        if(drivers.data.length==0)
        {
            logger.info("Driver_VehicleHandler: id doesnt match known Driver with Vehicle")
            return {status:0, data:"not found"}
        }
        else{
            logger.info("Driver_VehicleHandler: Driver vehicle found")
            return {status: 1, data: drivers.data} 
        }
    }      
    else{
        logger.error("Driver_VehicleHandler: "+ drivers.error)
        return {status:-1, error:drivers.error}
    }

}
module.exports = { 
    createDriver_Vehicle: createDriver_Vehicle,
    getVehicleByDriverId: getVehicleByDriverId,
    getDriversByVehicleId:getDriversByVehicleId
    };
  