//Used to hash password
const bcrypt = require('bcrypt');

// Import model
const UserModel = require('../Models/User');

// Import logger
const logger = require('./../utils/logger/logger');

// Create user
async function createUser(req) {

    try {

        // Get atributes
        const { User_name, User_last_name, User_password, User_address, User_Email } = req.body.request;
        //Hash the password
        var User_password_hashed = bcrypt.hashSync(User_password, 10);
        // Create user
        await UserModel.create(
            {
                User_name: User_name,
                User_last_name: User_last_name,
                User_password: User_password_hashed,
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
//status 0 = user not found
//status 1 = user found, id returned
//status -1 = error in UserModel.count, error message returned
//status -2 = error in UserModel.findAll from getUserByEmail, error message returned
async function validateUser(req) {

    try {

        // Get atributes
        const { User_Email, User_password } = req.body.request;

        // Validate user
        //count = await UserModel.count({ where: { User_Email: User_Email, User_password: User_password } })
        count = await UserModel.count({ where: { User_Email: User_Email} })
        if (count > 0) {
            logger.info("UserController: User is valid");
            let {status, data}=await getUserByEmail(User_Email)
            if(status==1)
            {
                //Compare hashed passwords
                if(bcrypt.compareSync(User_password, data.User_password) == false){
                return {status: 0, data: 'Las contraseñas no coinciden'};
                }
                logger.info("UserController: succesfull call to getUserBeEmail")
                return {status: 1, data: data};
            }else if(status==-1)
            {    logger.error("UserController: error from getUserBeEmail"+ error)
                return {status: -2, data: error};
            }
        }
        logger.info("UserController: User is not valid");
        return {status: 0, data: false};  ;

    } catch (error) {
        logger.error("UserController: " + error);
        return {status: -1, data: error};
    }

}

// Get user by email
//status 0 = user not found
//status 1 = user found, user returned
//status -1 = error, error message returned
async function getUserByEmail(email)
{
    //query to find user by given email (which is unique)
    try {
        let users = await UserModel.findAll(
            { where: { User_Email: email } }
            )
        //query returns array of users that match were clause
        if(users.length==0)
        {
            logger.info("UserController:email doesnt match known user")
            return {status:0, data:"not found"}
        }
        else{
            logger.info("UserController:User found")
            //users[0] should be the only user in array, .dataValues is Json containing atributes
            return {status: 1,data: users[0].dataValues}
        }

    } catch (error) {
        logger.info("UserController: "+ error)
        return {status:-1, data:error}

    }

}

module.exports = { createUser: createUser, validateUser: validateUser };
