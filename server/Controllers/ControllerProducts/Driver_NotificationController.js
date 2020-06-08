//importing model factory
ModelFactory = require('../../Models/ModelFactory');
// Create notification
async function create(Id_haulage, Id_Notification_Type, Id_driver) {

    try {
        // Create Driver
        var result = await ModelFactory.getModel("Driver_Notification").create(
            {
                Id_haulage: Id_haulage,
                Id_Notification_Type: Id_Notification_Type,
                Id_driver: Id_driver
            }
        )

        logger.info("Driver_NotificationController: notification was created successfully.");
        return {status: 1, data: result}

    } catch (error) {
        logger.error("DriverController: " + error);
        return {status: -1, error: error};
    }

}

async function getRegisterBy(query) {

    //query to find Driver by given email (which is unique)
    try {

        let notifications = await ModelFactory.getModel("Driver_Notification").findAll({
            where: query ,
            raw:true
        })
        //query returns array of Drivers that match were clause
        if(notifications.length==0)
        {
            logger.info("Driver_NotificationController:Driver has 0 notifications")
            return {status:0, data:"empty"}
        }
        else{
            logger.info("Driver_NotificationController:notifications found")
            return {status: 1,data: notifications}
        }

    } catch (error) {
        logger.error("Driver_NotificationController: "+ error)
        return {status:-1, error:error}

    }
}

module.exports = 
{
    create:create,
    getRegisterBy:getRegisterBy
}