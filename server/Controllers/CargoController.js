
// Import model
const CargoModel = require('../Models/Cargo');

// Create Cargo
async function createCargo(req) {

    try {

        // Get atributes
        const { Weight, Description, Comments } = req.body.request;

        // Create Cargo
        await CargoModel.create(
            {
                Weight: Weight,
                Description: Description,
                Comments: Comments
            }
        );
        return 1;
        
    } catch (error) {
        return error;
    }

}
module.exports = { createCargo: createCargo };
