
// Import model
const UserModel = require('../Models/User');

// Import logger
const logger = require('./../utils/logger/logger');

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
            ,{
                fields: ["User_name", "User_last_name", "User_password", "User_address", "User_Email"]
            }
        );
        logger.info("UserController: User was created successfully.");
        return 1;

    } catch (error) {
        logger.error("UserController: " + error);
        return error;
    }

}

// Validate user
async function validateUser(req) {

    try {

        // Get atributes
        const { User_address, User_password } = req.body.request;

        // Validate user
        count = await UserModel.count({ where: { User_address: User_address, User_password: User_password } })
        if (count > 0) {
            logger.info("UserController: User is valid");
            return true;
        }
        logger.info("UserController: User is not valid");
        return false;

    } catch (error) {
        logger.error("UserController: " + error);
        return error;
    }

}

module.exports = { createUser: createUser, validateUser: validateUser };
