// Create notification
async function create(Id_haulage, Id_Notification_Type, Id_driver) {

    try {
        // Create Driver
        var result = await ModelFactory.getModel("Driver").create(
            {
                Id_haulage: Id_haulage,
                Id_Notification_Type: Id_Notification_Type,
                Id_driver: Id_driver
            }
        )

        logger.info("Driver_NotificationController: notification was created successfully.");
        return {status: 1, data: result.Id_driver}

    } catch (error) {
        logger.error("DriverController: " + error);
        return {status: -1, error: error};
    }

}