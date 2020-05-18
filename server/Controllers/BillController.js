
// Import model
const BillModel = require('../Models/Bill');

// Import logger
const logger = require('./../utils/logger/logger');

// Create Bill
async function create(req) {

    try {

        // Get atributes
        const { Amount, Id_haulage } = req.body.request;

        // Create Bill
        await BillModel.create(
            {
              Amount: Amount,
              Id_haulage: Id_haulage
            }
        );
        logger.info("BillController: Bill was created successfully.");
        return 1;
        
    } catch (error) {
        logger.error("BillController: " + error);
        return error;
    }

}
module.exports = { create: create };
