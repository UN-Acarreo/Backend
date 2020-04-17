
// Import model
const DriverModel = require('../Models/Driver');

// Create Driver
async function createDriver(req) {

    try {

        // Get atributes
        const { Driver_name, Driver_last_name, Driver_password, Driver_address, Driver_Email, Average_rating, Driver_photo, Driver_phone, Identity_card } = req.body.request;

        // Create Driver
        await DriverModel.create(
            {
                Driver_name: Driver_name,
                Driver_last_name: Driver_last_name,
                Driver_password: Driver_password,
                Driver_address: Driver_address,
                Driver_Email: Driver_Email,
                Average_rating: Average_rating,
                Driver_photo: Driver_photo,
                Driver_phone: Driver_phone,
                Identity_card: Identity_card
            }
        );
        return 1;
        
    } catch (error) {
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
            return true;
        }
        return false;

    } catch (error) {
        return error;
    }

}

module.exports = { createDriver: createDriver, validateDriver: validateDriver };
