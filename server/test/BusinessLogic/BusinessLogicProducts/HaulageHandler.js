
// Import Assert
var assert = require("assert");

// Import Driver Handler
const HaulageHandler = require('../../../BusinessLogic/BusinessLogicProducts/HaulageHandler');

// Import Business Logic Factory
const businessLogicFactory = require('../../../BusinessLogic/BusinessLogicFactory');

// Import Controller Factory
const controllerFactory = require('../../../Controllers/ControllerFactory');

// Driver handler test
describe("Haulage handler test:", async function(){
  
    let id_user = undefined;
    let id_driver = undefined;
    let id_vehicle = undefined;

    before(async function() {
        /*// Insert client user test if doesn't exist
        await businessLogicFactory.getBusinessLogic("User").createUser({body:{request:{User_name: "TestClientName", User_last_name: "TestClientLastName", User_password: "123456", User_address: "TestClientDirection", User_Email: "testclientname@hotmail.com"}}}); 
        // Insert driver user test if doesn't exist
        await businessLogicFactory.getBusinessLogic("Driver").createDriver({body:{request:{Driver_name: "TestDriverName", Driver_last_name: "TestDriverLastName", Driver_password: "123456", Driver_address: "TestDriverDirection", Driver_Email: "testdrivername@hotmail.com", Driver_phone: 567890, Identity_card: 123456, Driver_photo: "/uploads/drivers/123456.png"}}});
        // Insert vehicle if doesn't exist
        await businessLogicFactory.getBusinessLogic("Vehicle").createVehicle( {body: {request: {Plate: "TestPlate", Brand: "TestBrand", Model: "TestModel", Payload_capacity: 100, Photo: "123456"}}});
        // Get regiter test user
        id_user =  (await controllerFactory.getController("User").getUserBy({User_Email: "testclientname@hotmail.com"})).data.Id_user;
        id_driver =  (await controllerFactory.getController("Driver").getRegisterBy({Driver_Email: "testdrivername@hotmail.com"})).data.Id_driver;
        id_vehicle =  (await controllerFactory.getController("Vehicle").getVehicleBy({Plate: "TestPlate"})).data.Id_vehicle;
        // Insert driver vehicle
        await businessLogicFactory.getBusinessLogic("Driver_Vehicle").createDriver_Vehicle(id_driver, id_vehicle, true);
        */
    });

    //it('If getHaulageList error', async () => assert.equal(await (await HaulageHandler.getHaulageList(id_user)).status, -1))

});