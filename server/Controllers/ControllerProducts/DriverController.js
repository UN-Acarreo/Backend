
// Import ModelFactory
ModelFactory = require('../../Models/ModelFactory');

// Import logger
const logger = require('../../utils/logger/logger');

// Create Driver
async function create(Driver_name, Driver_last_name, Driver_password_hashed, Driver_address, Driver_Email, Driver_phone, Identity_card, Driver_photo) {

    try {
        // Create Driver
        var result = await ModelFactory.getModel("Driver").create(
            {
                Driver_name: Driver_name,
                Driver_last_name: Driver_last_name,
                Driver_password: Driver_password_hashed,
                Driver_address: Driver_address,
                Driver_Email: Driver_Email,
                //Average_rating: Average_rating,
                Driver_photo: Driver_photo,
                Driver_phone: Driver_phone,
                Identity_card: Identity_card
            }
            ,{
                fields: ["Driver_name", "Driver_last_name", "Driver_password", "Driver_address", "Driver_Email", "Driver_phone", "Identity_card", "Driver_photo"]
            }
        )

        logger.info("DriverController: Driver was created successfully.");
        return {status: 1, data: result.Id_driver}

    } catch (error) {
        logger.error("DriverController: " + error);
        return {status: -1, error: error};
    }

}

// Counts all register that matches field
//status 1 = number of count returned
//status -1 = error in DriverModel.count, error message returned
async function countWhere(query) {

    try {
        count = await ModelFactory.getModel("Driver").count({ where: query })
        logger.info("DriverController:Number of Drivers returned")
        return{status:1, data:count}
    } catch (error) {
        logger.error("DriverController: " + error);
        return {status: -1, error: error};
    }
}

// Get Driver by email
//status 0 = Driver not found
//status 1 = Driver found, Driver returned
//status -1 = error, error message returned
async function getRegisterBy(query)
{
    //query to find Driver by given email (which is unique)
    try {

        let drivers = await ModelFactory.getModel("Driver").findAll(
            { where: query }
            )
        //query returns array of Drivers that match were clause
        if(drivers.length==0)
        {
            logger.info("DriverController:email doesnt match known Driver")
            return {status:0, data:"not found"}
        }
        else{
            logger.info("DriverController:Driver found")
            //drivers[0] should be the only Driver in array, .dataValues is Json containing atributes
            return {status: 1,data: drivers[0].dataValues}
        }

    } catch (error) {
        logger.info("DriverController: "+ error)
        return {status:-1, data:error}

    }
}
async function getRegisterByPk(Pk,attributes)
{
    try {
        let driver = await ModelFactory.getModel("Driver").findByPk(Pk,
            { 
                attributes: attributes,
                raw: true
            })
        logger.info("DriverController: register was returned successfully.");
        return {status: 1, data:driver}
        
    } catch (error) {
        logger.error("DriverController: " + error);
        return {status: -1, error: error};
    }
}

module.exports = { 
    create: create, 
    countWhere: countWhere,
    getRegisterBy: getRegisterBy,
    getRegisterByPk: getRegisterByPk

 };
