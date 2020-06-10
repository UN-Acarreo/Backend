// Import logger
const logger = require('../../../utils/logger/logger');
//import observer class
const Observer = require("./Observer").Observer
//import controller factory
const getController = require('../../../Controllers/ControllerFactory').getController;

class Subject {

    constructor() {
        this.notifications = new Set()
    }

    async registerObserver(observer,Id_haulage)
    {
        
        if(observer.typeObserver=="Driver")
        {
            //console.log("registerObserver"+observer.observer_Id + "haulage "+Id_haulage)
            //create register in DriverNotification table
            for (const notification of this.notifications) {
                //create register in DriverNotification table
                let new_notif = await getController("Driver_Notification").create(Id_haulage,notification,observer.observer_Id)
                if(new_notif.status==-1)
                    logger.error("Subject: in register observer: "+ new_notif.error)
                else
                    logger.info("Subject: in register observer: success")
            }
        }else if(observer.typeObserver=="User")
        {
            //create register in UserNotification table
        }
    }

    async removeObserver(observer,Id_haulage)
    {
        
        if(observer.typeObserver=="Driver")
        {
            let result = await getController("Driver_Notification").remove({
                Id_driver:observer.observer_Id,
                Id_haulage:Id_haulage
            })
            if(result.status==-1)
            {
                logger.error("Subject:removeObserver "+result.error)
                return {status:-1,error:result.error}
            }
            logger.info("Subject:removeObserver ")
            return {status:result.status,data:""}
            
        }else if(observer.typeObserver=="User")
        {
            //delete register in UserNotification table
        }
    }

    async notifyObserver(observer)
    {
        //notify all observers
        //console.log("notifyObserver")
        
        let update = await observer.update()
        if(update.status==-1)
        {
            return {status:-1, error: update.error}
        }
        else{
            return {status:update.status, data: update.data}
        }
        
        
    }
}

module.exports = {Subject:Subject}



