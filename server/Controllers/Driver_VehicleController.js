
// Import model
const Driver_VehicleModel = require('../Models/Driver_Vehicle');

// Create Driver_Vehicle
async function createDriver_Vehicle(req) {

    try {

        // Get atributes
        const { Id_driver, Id_vehicle, Is_owner } = req.body.request;

        // Create Driver_Vehicle
        await Driver_VehicleModel.create(
            {
                Id_driver: Id_driver,
                Id_vehicle: Id_vehicle,
                Is_owner: Is_owner
            }
        );
        return 1;
        
    } catch (error) {
        return error;
    }

}
module.exports = { createDriver_Vehicle: createDriver_Vehicle };
