
// Import model
const VehicleModel = require('../Models/Vehicle');

// Create Vehicle
async function createVehicle(req) {

    try {

        // Get atributes
        const { Plate, Brand, Model, Payload_capacity, Photo } = req.body.request;

        // Create Vehicle
        await VehicleModel.create(
            {
                Plate: Plate,
                Brand: Brand,
                Model: Model,
                Payload_capacity: Payload_capacity,
                Photo: Photo
            }
        );
        return 1;
        
    } catch (error) {
        return error;
    }

}
module.exports = { createVehicle: createVehicle };
