//Used to hash password
var bcrypt = require('bcryptjs');

// Import model
const DriverModel = require('../Models/Driver');

// Import logger
const logger = require('./../utils/logger/logger');

// Create Driver
async function createDriver(req) {

    try {

        // Get atributes
        //const { Driver_name, Driver_last_name, Driver_password, Driver_address, Driver_Email, Average_rating, Driver_photo, Driver_phone, Identity_card } = req.body.request;
        const { Driver_name, Driver_last_name, Driver_password, Driver_address, Driver_Email, Driver_phone, Identity_card, Driver_photo } = req.body.request;
        //Hash the password
        var Driver_password_hashed = bcrypt.hashSync(Driver_password, 10);
        // Create Driver
        var result = await DriverModel.create(
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
        return {status: 1, id: result.Id_driver}


    } catch (error) {
        logger.error("DriverController: " + error);
        return {status: -1, message: error};
    }

}

// Validate driver
//status 0 = driver not found
//status 1 = driver found, id returned
//status -1 = error in DriverModel.count, error message returned
//status -2 = error in DriverModel.findAll from getDriverByEmail, error message returned
async function validateDriver(req) {

    try {
        // Get atributes
        const { Driver_Email, Driver_password } = req.body.request;
        // Validate Driver
        //count = await DriverModel.count({ where: { Driver_Email: Driver_Email, Driver_password: Driver_password } })
        count = await DriverModel.count({ where: { Driver_Email: Driver_Email} })
        if (count > 0) {
            logger.info("DriverController: Driver is valid");
            let {status, data} = await getDriverByEmail(Driver_Email)
            if(status==1)
            {
                //Compare hashed passwords
                if(bcrypt.compareSync(Driver_password, data.Driver_password) == false){
                    return {status: 0, data: 'Las contraseñas no coinciden'};
                }
                logger.info("DriverController: succesfull call to getDriverBeEmail")
                return {status: 1, data: data};
            }else if(status==-1)
            {    logger.error("DriverController: error from getDriverBeEmail"+ error)
                return {status: -2, data: error};
            }
        }
        logger.info("DriverController: Driver is not valid");
        return {status: 0, data: false};  ;

    } catch (error) {
        logger.error("DriverController: " + error);
        return {status: -1, data: error};
    }

}

// Get Driver by email
//status 0 = Driver not found
//status 1 = Driver found, Driver returned
//status -1 = error, error message returned
async function getDriverByEmail(email)
{
    //query to find Driver by given email (which is unique)
    try {
        let drivers = await DriverModel.findAll(
            { where: { Driver_Email: email } }
            )
        //query returns array of Drivers that match were clause
        if(drivers.length==0)
        {
            logger.info("DriverController:email doesnt match known Driver")
            return {status:0, data:"not found"}
        }
        else{
            logger.info("DriverController:Driver found")
            //Drivers[0] should be the only Driver in array, .dataValues is Json containing atributes
            return {status: 1,data: drivers[0].dataValues}
        }

    } catch (error) {
        logger.info("DriverController: "+ error)
        return {status:-1, data:error}

    }

}

module.exports = { createDriver: createDriver, validateDriver: validateDriver };
