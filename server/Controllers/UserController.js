
// Import model
const UserModel = require('../Models/User');

// Create user
async function createUser(req) {

    try {

        // Get atributes
        const { User_name, User_last_name, User_password, User_address, User_Email } = req.body.request;

        // Create user
        await UserModel.create(
            {
                User_name: User_name,
                User_last_name: User_last_name,
                User_password: User_password,
                User_address: User_address,
                User_Email: User_Email
            }
        );
        return 1;

    } catch (error) {
        return error;
    }

}
module.exports = { createUser: createUser };
