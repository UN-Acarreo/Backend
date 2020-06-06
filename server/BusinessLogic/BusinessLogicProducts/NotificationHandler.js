//import logger
const logger = require('../../utils/logger/logger');
//import classes that implement observer pattern
const Observer = require("./Notifications/Observer").Observer;
const Subject = require("./Notifications/Subject").Subject;

async function createDriversNoficiations(drivers,Id_haulage)
{
    try {
        const subject = new Subject()
        for (const driver of drivers) {
            //console.log(driver)

            let Id_driver = driver.Id_driver
            let observer = new Observer(Id_driver,"Driver")
            await subject.registerObserver(observer,Id_haulage)
        }
        return {status:1} 
    } catch (error) {
        logger.error("NotificationHandler:"+ error)
        return {status:-1}
        
    }
    
}

async function getDriverNotifications(Id_driver)
{
    try {
        const subject = new Subject()
        await subject.notifyObserver(new Observer(Id_driver,"Driver"))

        return {status:1,data:"this should be a list of notifications"}
        
    } catch (error) {
        logger.error("NotificationHandler: "+ error)
        return {status:-1,error:"Hubo un error recuperando sus notificaciones"}
        
        
    }
    
}

async function removeDriverNotification(Id_driver,Id_haulage)
{
    try {
        const subject = new Subject()
        await subject.removeObserver(new Observer(Id_driver,"Driver"),Id_haulage)
        return {status:1}
        
    } catch (error) {
        logger.error("NotificationHandler: "+ error)
        return {status:-1,error: "Hubo un error eliminando la notificacion"}
        
    }
    
}

async function createUserNoficiations(Id_user,Id_haulage)
{
    try {
        
    } catch (error) {
        
        
    }
    
}

module.exports =
{
    createDriversNoficiations: createDriversNoficiations,
    getDriverNotifications: getDriverNotifications,
    removeDriverNotification: removeDriverNotification
}
    
