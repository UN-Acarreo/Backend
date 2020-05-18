// Import model
const Driver_VehicleModel = require('../Models/Driver_Vehicle');
const DriverModel = require('../Models/Driver');

//import vehicle model
const VehicleModel = require('../Models/Vehicle');
// Import logger
const logger = require('./../utils/logger/logger');

// Create Driver_Vehicle
async function create( Id_driver, Id_vehicle, Is_owner ) {

    try {

        // Get atributes
        //const { Id_driver, Id_vehicle, Is_owner } = req.body.request;

        // Create Driver_Vehicle
        await Driver_VehicleModel.create(
            {
                Id_driver: Id_driver,
                Id_vehicle: Id_vehicle,
                Is_owner: Is_owner
            }
        )
        logger.info("Driver_VehicleController: Driver_Vehicle was created successfully.");
        return {status: 1};

    } catch (error) {
        logger.error("Driver_VehicleController: " + error);
        return {status:-1, error:error};
    }
}

async function getDriversByVehicleId(Id_vehicle)
{
    try {

        let drivers = await Driver_VehicleModel.findAll({
            where: {Id_vehicle : Id_vehicle},
            raw:true
        })
        logger.info("Driver_VehicleController: list of driver returned.");
        return {status:1,data:drivers};
        
    } catch (error) {
        logger.error("Driver_VehicleController: " + error);
        return error;
    }
    
}



//status 0 = Driver not found
//status 1 = Driver found, Driver returned
//status -1 = error, error message returned
async function getRegisterBy(query,registerToGet)
{
    const Model = 
    console.log(query)
    console.log(registerToGet)
    //query to find Driver by given email (which is unique)
    try {
        //Model can be driver of vehicle, depending of what is needed
        const Model = require('../Models/'+registerToGet);
        let registers = await DriverModel.findAll(
            { where:  query , 
              attributes: [],
              include: [{model: Model}]
            }
        )
        
        //query returns array of Drivers or vehicles that match were clause
        if(registers.length==0)
        {
            logger.info("Driver_VehicleController: id doesnt match known Driver with Vehicle")
            return {status:0, data:"not found"}
        }
        else{
            logger.info("Driver_VehicleController: Driver vehicle found")
            console.log(registers)
            //console.log(registers[0])
            //registers[0] should be the only Driver in array, .dataValues is Json containing atributes
            return {status: 1,data: registers[0].dataValues} 
        }
              
    } catch (error) {
        logger.error("Driver_VehicleController: "+ error)
        return {status:-1, error:error}
        
    }
}


module.exports = {

    create: create,
    getRegisterBy: getRegisterBy,
    getDriversByVehicleId:getDriversByVehicleId};
