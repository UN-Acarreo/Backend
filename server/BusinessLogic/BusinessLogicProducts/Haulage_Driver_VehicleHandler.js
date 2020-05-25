
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
    //start date and end date are dates in wich new haulage needs to take place
    let end_date = new Date(
        start_date.getFullYear(), 
        start_date.getMonth(), 
        start_date.getDate(),
        start_date.getHours()+duration.hours,
        start_date.getMinutes()+duration.minutes
        )
    let fake_start_date = new Date(
        start_date.getFullYear(), 
        start_date.getMonth(), 
        start_date.getDate(),
        start_date.getHours()-duration.hours,
        start_date.getMinutes()-duration.minutes
        )
    let fake_end_date =start_date
    
    //getting all haulages that are active at time of haulage
    let activeHaulages = await ControllerFactory.getController("Haulage").getRegisterBy
        ({
            [Op.or]: 
                [{ 
                    Id_status: [description.IN_PROGRESS,
                    description.RESERVED,
                    description.WAITING_FOR_DRIVER] 
                }],
            [Op.or]:
                [
                    {
                        Date:
                        {
                            [Op.between]: [start_date,end_date]
                        }
                    },
                    {
                        Date:
                        {
                            [Op.between]: [fake_start_date,fake_end_date]
                        }
                    }
                ]            
        })
    if(activeHaulages.status!=1)
    {
        logger.error("Haulage_Driver_VehicleHandler: Error getting list:"+activeHaulages.error);
        return {status: -1, error: activeHaulages.error};  
    }
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

    logger.info("Haulage_Driver_VehicleHandler: list of bussy drivers and vehicles list returned successfully.");
    return {status: 1, data: {bussyDrivers:bussyDriversSet,bussyVehicles:bussyVehiclesSet}};

}
async function getDriver_VehicleInfo(driver_Pk,vehicle_Pk)
{
    let driverInfo= await ControllerFactory.getController("Driver").getRegisterByPk(
        driver_Pk,["Driver_name","Driver_last_name","Driver_phone"]
    )
    if(driverInfo.status!=1)
    {
        logger.error("Haulage_Driver_VehicleHandler: cant get driver info: "+driverInfo.error);
        return {status: -1, error: driverInfo.error};
    }
    let vehicleInfo= await ControllerFactory.getController("Vehicle").getRegisterByPk(
        vehicle_Pk,["Plate","Brand","Model"]
    )
    if(vehicleInfo.status!=1)
    {
        logger.error("Haulage_Driver_VehicleHandler: cant get vehicle info: "+vehicleInfo.error);
        return {status: -1, error: vehicleInfo.error};
    }
    logger.info("Haulage_Driver_VehicleHandler: driver_vehicle info ok ");
    let driver = driverInfo.data
    let vehicle = vehicleInfo.data
    return {
        status: 1, 
        data: 
        {
            Plate:vehicle.Plate,
            Brand:vehicle.Brand,
            Model:vehicle.Model,
            Driver_name:driver.Driver_name,
            Driver_last_name:driver.Driver_last_name,
            Driver_phone:driver.Driver_phone
        }
    }
}
async function getAll_Driver_VehicleInfo(needed_driver_vehicles)
{
    list = []
    for(element of needed_driver_vehicles)
    {
        let driver_vehicle = await getDriver_VehicleInfo(element.Id_driver,element.Id_vehicle)
        if(driver_vehicle.status!=-1)
        {
            list.push(driver_vehicle.data)
        }
        else
        {
            return {status: -1, error: driver_vehicle.error};
        }
    }
    logger.info("Haulage_Driver_VehicleHandler: all driver_vehicle info ok ");
    return{status:1, data:list}
}


module.exports ={
    createAllHaulage_Driver_VehicleFromList : createAllHaulage_Driver_VehicleFromList,
    getListOfBussyDriverVehicle : getListOfBussyDriverVehicle,
    getDriver_VehicleInfo: getDriver_VehicleInfo,
    getAll_Driver_VehicleInfo:getAll_Driver_VehicleInfo
}

