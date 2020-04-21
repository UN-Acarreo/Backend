
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
        // Create Driver
        await DriverModel.create(
            {
                Driver_name: Driver_name,
                Driver_last_name: Driver_last_name,
                Driver_password: Driver_password,
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
        );
        logger.info("DriverController: Driver was created successfully.");
        return 1;

    } catch (error) {
        logger.error("DriverController: " + error);
        return error;
    }

}

// Validate Driver
async function validateDriver(req) {

    try {

        // Get atributes
        const { Driver_address, Driver_password } = req.body.request;

        // Validate Driver
        count = await UserModel.count({ where: { Driver_address: Driver_address, Driver_password: Driver_password } })
        if (count > 0) {
            logger.info("DriverController: Driver is valid.");
            return true;
        }
        logger.info("DriverController: Driver is not valid.");
        return false;

    } catch (error) {
        logger.error("DriverController: " + error);
        return error;
    }

}

module.exports = { createDriver: createDriver, validateDriver: validateDriver };
