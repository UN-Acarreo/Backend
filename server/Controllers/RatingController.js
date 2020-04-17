
// Import model
const RatingModel = require('../Models/Rating');

// Create Rating
async function createRating(req) {

    try {

        // Get atributes
        const { Puntuality, Cargo_state, Customer_support, Comments } = req.body.request;

        // Create Rating
        await RatingModel.create(
            {
                Puntuality: Puntuality,
                Cargo_state: Cargo_state,
                Customer_support: Customer_support,
                Comments: Comments
            }
        );
        return 1;
        
    } catch (error) {
        return error;
    }

}
module.exports = { createRating: createRating };
