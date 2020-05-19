
// Import ModelFactory
ModelFactory = require('../../Models/ModelFactory');

// Import logger
const logger = require('../../utils/logger/logger');

// Create Rating
async function create(req) {

    try {

        // Get atributes
        const { Puntuality, Cargo_state, Customer_support, Comments } = req.body.request;

        // Create Rating
        await ModelFactory.getModel("Rating").create(
            {
                Puntuality: Puntuality,
                Cargo_state: Cargo_state,
                Customer_support: Customer_support,
                Comments: Comments
            }
        );
        logger.info("RatingController: Rating was created successfully.");
        return 1;
        
    } catch (error) {
        logger.error("RatingController: " + error);
        return error;
    }

}
module.exports = { create: create };
