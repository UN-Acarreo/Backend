// Import logger
const logger = require('../../../utils/logger/logger');
//import controller factory
const getController = require('../../../Controllers/ControllerFactory').getController;

class Observer {
    constructor(Id,typeObserver) {
      this.observer_Id = Id;
      this.typeObserver = typeObserver;
    }
    
    async update()
    {
        if(this.typeObserver=="Driver")
        {
            //console.log("notifyObserver " + this.observer_Id)
            //get all register in DriverNotification table for this driver
            let notifications = await getController("Driver_Notification").getRegisterBy({Id_driver:this.observer_Id})
            if(notifications.status==-1)
            {
                return {status:-1,error:notifications.error}
            }
            else{
                return {status:notifications.status, data:notifications.data}
            }
        }else if(this.typeObserver=="User")
        {
            //get all register in UserNotification table for this user
        }  
        
    }
    
  }

  module.exports = {Observer:Observer}