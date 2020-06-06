// Import logger
const logger = require('../../../utils/logger/logger');

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
        }else if(this.typeObserver=="User")
        {
            //get all register in UserNotification table for this user
        }  
        
    }
    
  }

  module.exports = {Observer:Observer}