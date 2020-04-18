
// Import model
const StatusModel = require('../Models/Status');

// Create Status
async function createStatus(req) {

    try {

        // Get atributes
        const { status_description } = req.body.request;

        // Create Status
        await StatusModel.create(
            {
                status_description: status_description
            }
        );
        return 1;
        
    } catch (error) {
        return error;
    }

}
module.exports = { createStatus: createStatus };
