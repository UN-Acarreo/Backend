
// Import model
const HaulageModel = require('../Models/Haulage');

// Create Haulage
async function createHaulage(req) {

    try {

        // Get atributes
        const { Date, Id_user, Id_route, Id_cargo, Id_rating, Id_status } = req.body.request;

        // Create Haulage
        await HaulageModel.create(
            {
                Date: Date,
                Id_user: Id_user,
                Id_route: Id_route,
                Id_cargo: Id_cargo,
                Id_rating: Id_rating,
                Id_status: Id_status
            }
        );
        return 1;
        
    } catch (error) {
        return error;
    }

}
module.exports = { createHaulage: createHaulage };