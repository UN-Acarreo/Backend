// Import ControllerFactory
const ControllerFactory = require('../../Controllers/ControllerFactory');

// Import logger
const logger = require('../../utils/logger/logger');

async function getBillInfo(Id_haulage)
{
    let bill = await ControllerFactory.getController("Bill").getRegisterBy({Id_haulage:Id_haulage})
    if(bill.status==1)
    {
        
    }
}