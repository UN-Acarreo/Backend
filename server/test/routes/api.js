
// Import Assert
var assert = require("assert");
var httpMocks  = require('node-mocks-http');

// Import sync database
syncDB = require("../../DataBase/syncDB.js");

// Import api.js for test
api = require("../../routes/api");


// User test
// Driver {nombre: TestDriverName, Apellido: TestDriverLastName, Cedula: 123456, Telefono: 567890, E-Mail: testdrivername@hotmail.com, Direccion: TestDriverDirection, Contraseña: 123456, Foto: "/uploads/drivers/123456.png"}
// Car {Marca: TestBrand, Modelo: TestModel, Placa: TestPlate, Capadidad: 5, Foto: "/uploads/vehicles/123456.png"}
// Client {nombre: TestClientName, Apellido: TestClientLastName, E-Mail: testclientname@hotmail.com, Direccion: TestClientDirection, Contraseña: 123456}

// Check Status Request in functions
async function checkStatusRequest (status, fun, params){

  // Simulate Request and Response
  req = httpMocks.createRequest(params);
  res = httpMocks.createResponse();

  // Make equal test
  assert.equal((await fun(req, res)).statusCode, status);

}

// Log client test
describe("Log client test:", async function(){
  
  // Good work
  it('Should return OK if client log works', () => checkStatusRequest(200, api.logClientErrors, {method: 'POST', body: {error: {message: "Test message", stack: "Stack message"}}}));

  // Bad request structure checks
  it('Should return Bad Request if client log request doesn\'t have "error" key',   () => checkStatusRequest(400, api.logClientErrors, {method: 'POST', body: {}}))
  it('Should return Bad Request if client log request doesn\'t have "message" key', () => checkStatusRequest(400, api.logClientErrors, {method: 'POST', body: {error: {stack: "Stack message"}}}));
  it('Should return Bad Request if client log request doesn\'t have "stack" key',   () => checkStatusRequest(400, api.logClientErrors, {method: 'POST', body: {error: {message: "Test message"}}}));

});

// Login test
describe("Login test:", async function() {
  
  // DataBase connection
  before(async function() {
    await syncDB();
  });

  // Good work
  // it('Should return OK if client login works', () => checkStatusRequest(200, api.login, {method: 'POST', params: {type_of_user: "client"}, body: {request: {User_Email: "testclientname@hotmail.com", User_password: "123456"}}}));
  // it('Should return OK if driver login works', () => checkStatusRequest(200, api.login, {method: 'POST', params: {type_of_user: "driver"}, body: {request: {User_Email: "testdrivername@hotmail.com", User_password: "123456"}}}));

  // Bad request structure checks
  it('Should return Bad Request if login doesn\'t have "type_of_user" key',         () => checkStatusRequest(400, api.login, {method: 'POST', body: {}}));
  it('Should return Bad Request if client login doesn\'t have "request" key',       () => checkStatusRequest(400, api.login, {method: 'POST', params: {type_of_user: "client"}, body: {}}));
  it('Should return Bad Request if client login doesn\'t have "User_Email" key',    () => checkStatusRequest(400, api.login, {method: 'POST', params: {type_of_user: "client"}, body: {request: {User_password: "123456"}}}));
  it('Should return Bad Request if client login doesn\'t have "User_password" key', () => checkStatusRequest(400, api.login, {method: 'POST', params: {type_of_user: "client"}, body: {request: {User_Email: "testclientname@hotmail.com"}}}));
  it('Should return Bad Request if driver login doesn\'t have "request" key',       () => checkStatusRequest(400, api.login, {method: 'POST', params: {type_of_user: "driver"}, body: {}}));
  it('Should return Bad Request if driver login doesn\'t have "User_Email" key',    () => checkStatusRequest(400, api.login, {method: 'POST', params: {type_of_user: "driver"}, body: {request: {User_password: "123456"}}}));
  it('Should return Bad Request if driver login doesn\'t have "User_password" key', () => checkStatusRequest(400, api.login, {method: 'POST', params: {type_of_user: "driver"}, body: {request: {User_Email: "testclientname@hotmail.com"}}}));

  // Data type checks
  it('Should return Bad Request if login doesn\'t have String data type in "type_of_user" key',         () => checkStatusRequest(400, api.login, {method: 'POST', params: {type_of_user: 345545}, body: {request: {User_Email: "testclientname@hotmail.com", User_password: "123456"}}}));  
  it('Should return Bad Request if client login doesn\'t have String data type in "User_Email" key',    () => checkStatusRequest(400, api.login, {method: 'POST', params: {type_of_user: "client"}, body: {request: {User_Email: 345432345, User_password: "123456"}}}));  
  it('Should return Bad Request if client login doesn\'t have String data type in "User_password" key', () => checkStatusRequest(400, api.login, {method: 'POST', params: {type_of_user: "client"}, body: {request: {User_Email: "testclientname@hotmail.com", User_password: 123456}}}));  
  it('Should return Bad Request if driver login doesn\'t have String data type in "User_Email" key',    () => checkStatusRequest(400, api.login, {method: 'POST', params: {type_of_user: "driver"}, body: {request: {User_Email: 345432345, User_password: "123456"}}}));  
  it('Should return Bad Request if driver login doesn\'t have String data type in "User_password" key', () => checkStatusRequest(400, api.login, {method: 'POST', params: {type_of_user: "driver"}, body: {request: {User_Email: "testclientname@hotmail.com", User_password: 123456}}}));  

  // Data format checks
  it('Should return Bad Request if login doesn\'t have "client" or "driver" values in "type_of_user" key',  () => checkStatusRequest(400, api.login, {method: 'POST', params: {type_of_user: "asdas"}, body: {request: {User_Email: "", User_password: "123456"}}}));
  it('Should return Bad Request if client login have empty "User_Email" key',                               () => checkStatusRequest(400, api.login, {method: 'POST', params: {type_of_user: "client"}, body: {request: {User_Email: "", User_password: "123456"}}}));
  it('Should return Bad Request if client login have empty "User_password" key',                            () => checkStatusRequest(400, api.login, {method: 'POST', params: {type_of_user: "client"}, body: {request: {User_Email: "testclientname@hotmail.com", User_password: ""}}}));
  it('Should return Bad Request if client login doesn\'t have correct e-mail format in "User_Email" key',   () => checkStatusRequest(400, api.login, {method: 'POST', params: {type_of_user: "client"}, body: {request: {User_Email: "234ewrw3", User_password: "123456"}}}));
  it('Should return Bad Request if driver login have empty "User_Email" key',                               () => checkStatusRequest(400, api.login, {method: 'POST', params: {type_of_user: "driver"}, body: {request: {User_Email: "", User_password: "123456"}}}));
  it('Should return Bad Request if driver login have empty "User_password" key',                            () => checkStatusRequest(400, api.login, {method: 'POST', params: {type_of_user: "driver"}, body: {request: {User_Email: "testclientname@hotmail.com", User_password: ""}}}));
  it('Should return Bad Request if driver login doesn\'t have correct e-mail format in "User_Email" key',   () => checkStatusRequest(400, api.login, {method: 'POST', params: {type_of_user: "driver"}, body: {request: {User_Email: "234ewrw3", User_password: "123456"}}}));
  
});

// Driver signup test
describe("Driver signup test:", async function() {
  
  // DataBase connection
  before(async function() {
    await syncDB();
  });

  // Good work
  // it('Should return OK if driver signup works', () => checkStatusRequest(400, api.driverSignup, {method: 'POST', body: {request: {Driver_name: "TestDriverName", Driver_last_name: "TestDriverLastName", Identity_card: 123456, Driver_phone: 567890, Driver_Email: "testdrivername@hotmail.com", Driver_address: "TestDriverDirection", Driver_password: "123456"}}}));

  // Bad request structure checks
  it('Should return Bad Request if driver signup login doesn\'t have "request" key',          () => checkStatusRequest(400, api.driverSignup, {method: 'POST', body: {}}));
  it('Should return Bad Request if driver signup login doesn\'t have "Driver_name" key',      () => checkStatusRequest(400, api.driverSignup, {method: 'POST', body: {request: {Driver_last_name: "TestDriverLastName", Identity_card: 123456, Driver_phone: 567890, Driver_Email: "testdrivername@hotmail.com", Driver_address: "TestDriverDirection", Driver_password: "123456", Driver_photo: "/uploads/drivers/123456.png"}}}));
  it('Should return Bad Request if driver signup login doesn\'t have "Driver_last_name" key', () => checkStatusRequest(400, api.driverSignup, {method: 'POST', body: {request: {Driver_name: "TestDriverName", Identity_card: "123456", Driver_phone: 567890, Driver_Email: "testdrivername@hotmail.com", Driver_address: "TestDriverDirection", Driver_password: "123456", Driver_photo: "/uploads/drivers/123456.png"}}}));
  it('Should return Bad Request if driver signup login doesn\'t have "Identity_card" key',    () => checkStatusRequest(400, api.driverSignup, {method: 'POST', body: {request: {Driver_name: "TestDriverName", Driver_last_name: "TestDriverLastName", Driver_phone: 567890, Driver_Email: "testdrivername@hotmail.com", Driver_address: "TestDriverDirection", Driver_password: "123456", Driver_photo: "/uploads/drivers/123456.png"}}}));
  it('Should return Bad Request if driver signup login doesn\'t have "Driver_phone" key',     () => checkStatusRequest(400, api.driverSignup, {method: 'POST', body: {request: {Driver_name: "TestDriverName", Driver_last_name: "TestDriverLastName", Identity_card: 123456, Driver_Email: "testdrivername@hotmail.com", Driver_address: "TestDriverDirection", Driver_password: "123456", Driver_photo: "/uploads/drivers/123456.png"}}}));
  it('Should return Bad Request if driver signup login doesn\'t have "Driver_Email" key',     () => checkStatusRequest(400, api.driverSignup, {method: 'POST', body: {request: {Driver_name: "TestDriverName", Driver_last_name: "TestDriverLastName", Identity_card: 123456, Driver_phone: 567890, Driver_address: "TestDriverDirection", Driver_password: "123456", Driver_photo: "/uploads/drivers/123456.png"}}}));
  it('Should return Bad Request if driver signup login doesn\'t have "Driver_address" key',   () => checkStatusRequest(400, api.driverSignup, {method: 'POST', body: {request: {Driver_name: "TestDriverName", Driver_last_name: "TestDriverLastName", Identity_card: 123456, Driver_phone: 567890, Driver_Email: "testdrivername@hotmail.com", Driver_password: "123456", Driver_photo: "/uploads/drivers/123456.png"}}}));
  it('Should return Bad Request if driver signup login doesn\'t have "Driver_password" key',  () => checkStatusRequest(400, api.driverSignup, {method: 'POST', body: {request: {Driver_name: "TestDriverName", Driver_last_name: "TestDriverLastName", Identity_card: 123456, Driver_phone: 567890, Driver_Email: "testdrivername@hotmail.com", Driver_address: "TestDriverDirection", Driver_photo: "/uploads/drivers/123456.png"}}}));
  it('Should return Bad Request if driver signup login doesn\'t have "Driver_photo" key',     () => checkStatusRequest(400, api.driverSignup, {method: 'POST', body: {request: {Driver_name: "TestDriverName", Driver_last_name: "TestDriverLastName", Identity_card: 123456, Driver_phone: 567890, Driver_Email: "testdrivername@hotmail.com", Driver_address: "TestDriverDirection", Driver_password: "123456"}}}));

  // Data type checks
  it('Should return Bad Request if driver signup login doesn\'t have String data type in "Driver_name" key',      () => checkStatusRequest(400, api.driverSignup, {method: 'POST', body: {request: {Driver_name: 123456, Driver_last_name: "TestDriverLastName", Identity_card: 123456, Driver_phone: 567890, Driver_Email: "testdrivername@hotmail.com", Driver_address: "TestDriverDirection", Driver_password: "123456", Driver_photo: "/uploads/drivers/123456.png"}}}));
  it('Should return Bad Request if driver signup login doesn\'t have String data type in "Driver_last_name" key', () => checkStatusRequest(400, api.driverSignup, {method: 'POST', body: {request: {Driver_name: "TestDriverName", Driver_last_name: 123456, Identity_card: 123456, Driver_phone: 567890, Driver_Email: "testdrivername@hotmail.com", Driver_address: "TestDriverDirection", Driver_password: "123456", Driver_photo: "/uploads/drivers/123456.png"}}}));
  it('Should return Bad Request if driver signup login doesn\'t have Number data type in "Identity_card" key',    () => checkStatusRequest(400, api.driverSignup, {method: 'POST', body: {request: {Driver_name: "TestDriverName", Driver_last_name: "TestDriverLastName", Identity_card: "123456", Driver_phone: 567890, Driver_Email: "testdrivername@hotmail.com", Driver_address: "TestDriverDirection", Driver_password: "123456", Driver_photo: "/uploads/drivers/123456.png"}}}));
  it('Should return Bad Request if driver signup login doesn\'t have String data type in "Driver_phone" key',     () => checkStatusRequest(400, api.driverSignup, {method: 'POST', body: {request: {Driver_name: "TestDriverName", Driver_last_name: "TestDriverLastName", Identity_card: 123456, Driver_phone: "567890", Driver_Email: "testdrivername@hotmail.com", Driver_address: "TestDriverDirection", Driver_password: "123456", Driver_photo: "/uploads/drivers/123456.png"}}}));
  it('Should return Bad Request if driver signup login doesn\'t have String data type in "Driver_Email" key',     () => checkStatusRequest(400, api.driverSignup, {method: 'POST', body: {request: {Driver_name: "TestDriverName", Driver_last_name: "TestDriverLastName", Identity_card: 123456, Driver_phone: 567890, Driver_Email: 123456, Driver_address: "TestDriverDirection", Driver_password: "123456", Driver_photo: "/uploads/drivers/123456.png"}}}));
  it('Should return Bad Request if driver signup login doesn\'t have String data type in "Driver_address" key',   () => checkStatusRequest(400, api.driverSignup, {method: 'POST', body: {request: {Driver_name: "TestDriverName", Driver_last_name: "TestDriverLastName", Identity_card: 123456, Driver_phone: 567890, Driver_Email: "testdrivername@hotmail.com", Driver_address: 123456, Driver_password: "123456", Driver_photo: "/uploads/drivers/123456.png"}}}));
  it('Should return Bad Request if driver signup login doesn\'t have String data type in "Driver_password" key',  () => checkStatusRequest(400, api.driverSignup, {method: 'POST', body: {request: {Driver_name: "TestDriverName", Driver_last_name: "TestDriverLastName", Identity_card: 123456, Driver_phone: 567890, Driver_Email: "testdrivername@hotmail.com", Driver_address: "TestDriverDirection", Driver_password: 123456, Driver_photo: "/uploads/drivers/123456.png"}}}));
  it('Should return Bad Request if driver signup login doesn\'t have String data type in "Driver_photo" key',     () => checkStatusRequest(400, api.driverSignup, {method: 'POST', body: {request: {Driver_name: "TestDriverName", Driver_last_name: "TestDriverLastName", Identity_card: 123456, Driver_phone: 567890, Driver_Email: "testdrivername@hotmail.com", Driver_address: "TestDriverDirection", Driver_password: "123456", Driver_photo: 123456}}}));

  // Data format checks
  it('Should return Bad Request if driver signup login have digits in "Driver_name" key',                   () => checkStatusRequest(400, api.driverSignup, {method: 'POST', body: {request: {Driver_name: "Test5Driver5Name", Driver_last_name: "TestDriverLastName", Identity_card: 123456, Driver_phone: 567890, Driver_Email: "testdrivername@hotmail.com", Driver_address: "TestDriverDirection", Driver_password: "123456", Driver_photo: "/uploads/drivers/123456.png"}}}));
  it('Should return Bad Request if driver signup login have blanks in "Driver_name" key',                   () => checkStatusRequest(400, api.driverSignup, {method: 'POST', body: {request: {Driver_name: "Test Driver Name", Driver_last_name: "TestDriverLastName", Identity_card: 123456, Driver_phone: 567890, Driver_Email: "testdrivername@hotmail.com", Driver_address: "TestDriverDirection", Driver_password: "123456", Driver_photo: "/uploads/drivers/123456.png"}}}));
  it('Should return Bad Request if driver signup login have special characters in "Driver_name" key',       () => checkStatusRequest(400, api.driverSignup, {method: 'POST', body: {request: {Driver_name: "Test_Driver_Name", Driver_last_name: "TestDriverLastName", Identity_card: 123456, Driver_phone: 567890, Driver_Email: "testdrivername@hotmail.com", Driver_address: "TestDriverDirection", Driver_password: "123456", Driver_photo: "/uploads/drivers/123456.png"}}}));
  it('Should return Bad Request if driver signup login have digits in "Driver_last_name" key',              () => checkStatusRequest(400, api.driverSignup, {method: 'POST', body: {request: {Driver_name: "TestDriverName", Driver_last_name: "Test5Driver5Last5Name", Identity_card: 123456, Driver_phone: 567890, Driver_Email: "testdrivername@hotmail.com", Driver_address: "TestDriverDirection", Driver_password: "123456", Driver_photo: "/uploads/drivers/123456.png"}}}));
  it('Should return Bad Request if driver signup login have blanks in "Driver_last_name" key',              () => checkStatusRequest(400, api.driverSignup, {method: 'POST', body: {request: {Driver_name: "TestDriverName", Driver_last_name: "Test Driver Last Name", Identity_card: 123456, Driver_phone: 567890, Driver_Email: "testdrivername@hotmail.com", Driver_address: "TestDriverDirection", Driver_password: "123456", Driver_photo: "/uploads/drivers/123456.png"}}}));
  it('Should return Bad Request if driver signup login have special characters in "Driver_last_name" key',  () => checkStatusRequest(400, api.driverSignup, {method: 'POST', body: {request: {Driver_name: "TestDriverName", Driver_last_name: "TestDriverLastName", Identity_card: 123456, Driver_phone: 567890, Driver_Email: "testdrivername@hotmail.com", Driver_address: "TestDriverDirection", Driver_password: "123456", Driver_photo: "/uploads/drivers/123456.png"}}}));

});

