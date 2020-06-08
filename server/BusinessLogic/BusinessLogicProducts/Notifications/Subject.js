// Import logger
const logger = require('../../../utils/logger/logger');
//import observer class
const Observer = require("./Observer").Observer

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
            //delete register in DriverNotification table
            //console.log("removeObserver "+observer.observer_Id + "haulage "+Id_haulage)
        }else if(observer.typeObserver=="User")
        {
            //delete register in UserNotification table
        }
    }

    async notifyObserver(observer)
    {
        //notify all observers
        //console.log("notifyObserver")
        
        await observer.update()
        
        
    }
}

module.exports = {Subject:Subject}



