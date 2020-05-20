
// Import ControllerFactory
ControllerFactory = require('../../Controllers/ControllerFactory');
description = require("../../constants").status_description

// Import logger
const logger = require('../../utils/logger/logger');
//Op works for more advanced querys
const { Op } = require("sequelize");

// create all Haulage_Driver_Vehicle from list
async function createAllHaulage_Driver_VehicleFromList(list_driver_vehicles,Id_haulage){

    for (const element of list_driver_vehicles) {
        let new_h_d_v = await ControllerFactory.getController("Haulage_Driver_Vehicle").create(
            Id_haulage, element.Id_driver, element.Id_vehicle, true
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
async function getListOfBussyDriverVehicle(start_date,duration) {
    console.log(duration)
    let end_date = new Date(
        start_date.getFullYear(), 
        start_date.getMonth(), 
        start_date.getDate(),
        start_date.getHours()+duration.hours,
        start_date.getMinutes()+duration.minutes
        )
    console.log("start date")
    console.log(start_date)
    console.log("end date")
    console.log(end_date)
    //getting all haulages that are active at time of haulage
    let activeHaulages = await ControllerFactory.getController("Haulage").getRegisterBy
        ({
            [Op.or]: 
                [{ 
                    Id_status: [description.IN_PROGRESS,
                    description.RESERVED,
                    description.WAITING_FOR_DRIVER] 
                }],
            Date: {
                    [Op.between]: [start_date,end_date]
            }
            
        })
    if(activeHaulages.status!=1)
    {
        logger.error("Haulage_Driver_VehicleHandler: Error getting list:"+activeHaulages.error);
        return {status: -1, error: activeHaulages.error};  
    }
    console.log(activeHaulages)

    let bussyDrivers = []
    let bussyVehicles = []
    //for each haulage i am getting driver vehicles asociated
    for (const element  of activeHaulages.data) {
        let Id_haulage= element.Id_haulage
        //bussyDriver_Vehicle is a list with all driver vehicles asociated
        let bussyDriver_Vehicles = await 
        ControllerFactory.getController("Haulage_Driver_Vehicle").getRegisterBy({
            Id_haulage:Id_haulage
            });
        if(bussyDriver_Vehicles.status==-1)
        {
            logger.error("Haulage_Driver_VehicleHandler: Error getting list second for: "+activeHaulages.error);
            return {status: -1, error: bussyDriver_Vehicles.error};
        }
        for(const driver_vehicle of bussyDriver_Vehicles.data)
        {
            bussyDrivers.push(driver_vehicle.Id_driver)
            bussyVehicles.push(driver_vehicle.Id_vehicle)
        }
    }
    let bussyDriversSet = new Set(bussyDrivers)
    let bussyVehiclesSet = new Set(bussyVehicles)
    console.log("bussy drivers and vehciles")
    console.log(bussyDriversSet)
    console.log(bussyVehiclesSet)

    logger.info("Haulage_Driver_VehicleHandler: list of bussy drivers and vehicles list returned successfully.");
    return {status: 1, data: {bussyDrivers:bussyDriversSet,bussyVehicles:bussyVehiclesSet}};

}

module.exports ={
    createAllHaulage_Driver_VehicleFromList : createAllHaulage_Driver_VehicleFromList,
    getListOfBussyDriverVehicle : getListOfBussyDriverVehicle
}

