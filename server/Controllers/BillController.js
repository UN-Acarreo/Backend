
// Import model
const BillModel = require('../Models/Bill');

// Create Bill
async function createBill(req) {

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
        return 1;
        
    } catch (error) {
        return error;
    }

}
module.exports = { createBill: createBill };
