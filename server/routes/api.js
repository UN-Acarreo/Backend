
const express = require ('express');
const router = express.Router();
const path = require("path");

// Import BusinessLogicFactory
const BusinessLogicFactory = require('../BusinessLogic/BusinessLogicFactory');

// Import logger
const logger = require('./../utils/logger/logger');

//Route will be used to handle login POST requests
router.post('/log-client-errors', async function(req, res){

  let error = req.body.error.message;
  let errorInfo = req.body.error.stack;
  //console.log(req.body.message);
  logger.error("Api:Server recieved error from client:: " + JSON.stringify(error) + " "+ JSON.stringify(errorInfo))
  return res.status(200).send("ok");

});

//Login for user and driver
//status 0 = user/driver not found
//status 1 = user/driver found, id returned
//status -1 = error, error message returned
//status -2 = filed checks failed, error message returned
//status -3 = wrong path
router.post('/:type_of_user/login', async function(req, res){
  //TODO login user using Oauth
  let type_of_user = req.params.type_of_user
  //data validation  
  const valid_fields = await BusinessLogicFactory.getBusinessLogic("Fields").check_fields(req);
  if(valid_fields !== true){
     return res.status(400).json({status:-2, error: valid_fields})
  }
  if(type_of_user=="client")
  {
    //Client login
    let {status,data} = await BusinessLogicFactory.getBusinessLogic("User").validateUser(req);
    if(status==1)
    {
      logger.info("api.js: returned user id succesfully")
      return res.status(200).json({status: 1, db_user_id: data});

    }else if(status==0)
    {
      logger.info("api.js: could not find user")
      return res.status(400).json({status: 0, error: "Correo o contraseña incorrectos"});
    }
    else if(status==-1 || status==-2)
    {
      logger.error("api.js: "+ data)
      return res.status(500).json({status: -1, error: "Error del servidor"});
    }
  }else if(type_of_user=="driver"){
    //driver login
    //the following lines were coded because original req conteined fields related to user
    //new_req changes names of this fields to match the ones of the driver
    let new_request ={Driver_Email:req.body.request.User_Email,
      Driver_password:req.body.request.User_password
    };
    let new_req ={body:{request:new_request}};

    let {status,data} = await BusinessLogicFactory.getBusinessLogic("Driver").validateDriver(new_req);
   
    if(status==1)
    {
      //let vehicle_status, vehicle_data = await (await Driver_Vehicle_Handler.getVehicleByDriverId(data.Id_driver)).data;
      let vehicle =  await BusinessLogicFactory.getBusinessLogic("Driver_Vehicle").getVehicleByDriverId(data.Id_driver);
      if(vehicle.status!=1)
      {
        logger.error("api.js: "+vehicle.error)
        return res.status(500).json({status: -1, error: "Error del servidor"});
      }
      logger.info("api.js: returned Driver id succesfully")
      return res.status(200).json({status: 1, db_driver_id: data, vehicle_data: vehicle.data});

    }else if(status==0)
    {
      logger.info("api.js: could not find Driver")
      return res.status(400).json({status: 0, error: "Correo o contraseña incorrectos"});
    }
    else if(status==-1 || status==-2)
    {
      logger.error("api.js: "+data)
      return res.status(500).json({status: -1, error: "Error del servidor"});
    }

  }
  else{
      logger.info("api.js: request parameters doesnt mactch driver nor user")
      return res.status(404).json({status: -3, error: "ruta incorrecta"});

  }

})

//Route will be used to handle driver sign up POST requests
router.post('/driver/signup', async function(req, res){

  const valid_fields = await BusinessLogicFactory.getBusinessLogic("Fields").check_fields(req);
  if(valid_fields !== true){
     return res.status(400).json({error: valid_fields})
  }
  //Save drivers image
  const filePath = path.join(__dirname, "../public/uploads/drivers/");
  const imageSaved = await BusinessLogicFactory.getBusinessLogic("Image").saveImage(req.body.request.foto_data, filePath, req.body.request.Identity_card)
  if(imageSaved == false){
      logger.info('Signup driver: Error in save image')
      return res.status(400).json({error: 'No se puede guardar la imagen seleccionada'})
  }

  //Set the path of the saved image on the db field
  var baseImage = req.body.request.foto_data
  const extension = baseImage.substring(baseImage.indexOf("/")+1, baseImage.indexOf(";base64"));
  req.body.request.Driver_photo = '/uploads/drivers/'+req.body.request.Identity_card+"."+extension

  //Save driver on db
  let saved = await BusinessLogicFactory.getBusinessLogic("Driver").createDriver(req);
  //console.log('variabe: '+saved)
  if(saved.status == 1)
  {
    logger.info("Signup driver: added succesfully");
    return res.status(201).json({status: 1, db_driver_id: saved.data});
  }
  else{
    message = saved.message.toString()
    logger.error("Signup driver: " + message);
    if (message == "SequelizeUniqueConstraintError: llave duplicada viola restricción de unicidad «Driver_Driver_Email_key»") {
      return res.status(400).json({error : "El E-Mail ya existe"});
    }
    if (message == "SequelizeUniqueConstraintError: llave duplicada viola restricción de unicidad «Driver_Driver_phone_key»") {
      return res.status(400).json({error : "El Teléfono ya existe"});
    }
    if (message == "SequelizeUniqueConstraintError: llave duplicada viola restricción de unicidad «Driver_Identity_card_key»") {
      return res.status(400).json({error : "La Cédula ya existe"});
    }
    return res.status(500).json({error : message});
  }

});

router.post('/vehicle/signup', async function(req, res){
  const valid_fields = await BusinessLogicFactory.getBusinessLogic("Fields").check_fields(req);
  if(valid_fields !== true){
     return res.status(400).json({error: valid_fields})
  }
  //Save vehicle image
  const filePath = path.join(__dirname, "../public/uploads/vehicles/");
  const imageSaved = await BusinessLogicFactory.getBusinessLogic("Image").saveImage(req.body.request.foto_data, filePath, req.body.request.Identity_card)
  if(imageSaved == false){
      logger.info('Signup driver: Error in save image')
      return res.status(400).json({error: 'No se puede guardar la imagen seleccionada'})
  }

  //Set the path of the saved image on the db field
  var baseImage = req.body.request.foto_data
  const extension = baseImage.substring(baseImage.indexOf("/")+1, baseImage.indexOf(";base64"));
  req.body.request.Photo = '/uploads/vehicles/'+req.body.request.Identity_card+"."+extension

  //Save vehicle on db
  let saved_vehicle = await BusinessLogicFactory.getBusinessLogic("Vehicle").createVehicle(req);
  //error saving the vehicle
  if(saved_vehicle.status != 1 && saved_vehicle.message){
     message = saved_vehicle.message.toString()
     logger.error("Signup vehicle: " + message);
     if (message == "SequelizeUniqueConstraintError: llave duplicada viola restricción de unicidad «Vehicle_Plate_key»") {
       return res.status(400).json({error : "La Placa ya existe"});
     }
     return res.status(500).json({error : message});
  }

  //Create driver-vehicle on db using the function: createDriver_Vehicle( Id_driver, Id_vehicle, Is_owner )
  let success_driver_vehicle = await BusinessLogicFactory.getBusinessLogic("Driver_Vehicle").createDriver_Vehicle(req.body.request.db_driver_id, saved_vehicle.data, req.body.request.Is_owner)


  if(success_driver_vehicle == 1)
  {
    logger.info("Signup vehicle: added succesfully");
    //res.status(201).send("added succesfully");
    return res.status(201).json({status: 1});

  }
  else{
    logger.error("Signup vehicle: " + 'Error registrando el vehículo');
     return res.status(500).json({error : success_driver_vehicle.message});
  }

});

//Route will be used to handle client sign up POST requests
router.post('/client/signup', async function(req,res){
  const valid_fields = await BusinessLogicFactory.getBusinessLogic("Fields").check_fields(req);
  if(valid_fields !== true){
     return res.status(400).json({error: valid_fields})
  }

  let success = await BusinessLogicFactory.getBusinessLogic("User").createUser(req);
  if(success==1)
  {
    logger.info("Signup client: added succesfully");
    return res.status(201).json({status: 1});
  }
  else{
    message = success.toString()
    logger.error("Signup user: " + message);
    if (message == "SequelizeUniqueConstraintError: llave duplicada viola restricción de unicidad «User_User_Email_key»") {
      return res.status(400).json({error : "El E-Mail ya existe"});
    }
    return res.status(500).json({error : message});
  }
});

//Route will be used to handle POST requests of service creation
//returns -1 if error creating route, cargo or haulage
router.post('/haulage/create', async function(req, res){
  
  const valid_fields = await BusinessLogicFactory.getBusinessLogic("Fields").check_fields(req);
  if(valid_fields !== true){
     return res.status(400).json({error: valid_fields})
  }

  values = req.body.request;
  //check for vehicle

  //this is a set with all vehicles and a set of drivers bussy the day of haulage
  let free_drivers_and_vehicles =
   await BusinessLogicFactory.getBusinessLogic("Haulage_Driver_Vehicle").getListOfBussyDriverVehicle(
     new Date(values.Date.Year,values.Date.Month,values.Date.Day,values.Date.Hour,values.Date.Minute),
     {hours:parseInt(values.Duration),minutes:0}
     );

  if(free_drivers_and_vehicles.status!=1)
  {
    logger.error("api.js: list of bussy cars not found "+free_drivers_and_vehicles.error);
    return res.status(500).json({status: -1, error: free_drivers_and_vehicles.error});
  }

  let bussyVehicles = free_drivers_and_vehicles.data.bussyVehicles
  let bussyDrivers = free_drivers_and_vehicles.data.bussyDrivers


  //getting list of free vehicles
  let freeVehicles = await BusinessLogicFactory.getBusinessLogic("Vehicle").getFreeVehicles(bussyVehicles)
  if(freeVehicles.status!=1)
  {
    logger.error("api.js: Error getting list of free cars:"+freeVehicles.error);
    return res.status(500).json({status: -1, error: freeVehicles.error});
  }
 
  //this are the vehicles that need to be used for the haulage (this function is not async so there is no need for await)
  let needed_vehicles=  BusinessLogicFactory.getBusinessLogic("Vehicle").getListOfNeededVehicles(freeVehicles.data,values.Weight)
  if(needed_vehicles.status!=1)
  {
    logger.info("api.js: Cant create haulage, no vehicles available");
    return res.status(200).json({status: 0, error: "No hay suficientes vehiculos para cumplir su acarreo"});
  }
  let needed_driver_vehicles=[];

  for (const element of needed_vehicles.data) {
    let driver = await BusinessLogicFactory.getBusinessLogic("Driver_Vehicle").chooseFreeDriver(element.Id_vehicle,bussyDrivers)
    if(driver.status!=1){
      logger.error("api.js: Cant get list of drivers");
      return res.status(500).json({status: -1, error: "Hubo un problema asignando los conductores"});
    }
    needed_driver_vehicles.push(driver.data);
  }
  

  //creating haualge and other asosiated registers
  let haulage = await BusinessLogicFactory.getBusinessLogic("Haulage").createHaulageWithRouteCargo(values);

  if(haulage.status==-3){
    logger.error("api.js: error creating haulage: "+haulage.error);
    return res.status(500).json({status: -1, error: "Hubo un problema registrado la reserva de su acarreo"});
  } else if(haulage.status==-2){
    logger.error("api.js: error creating haulage: "+haulage.error);
    return res.status(500).json({status: -1, error: "Hubo un problema creando la ruta de su acarreo"});
  } else if(haulage.status==-1){
    logger.error("api.js: error creating haulage: "+haulage.error);
    return res.status(500).json({status: -1, error: "Hubo un problema registrado la carga de su acarreo"})
  }

  logger.info("api.js: haulage, cargo and route created: ");
  //creating records for haulage driver vehicles
  response =
  await BusinessLogicFactory.getBusinessLogic("Haulage_Driver_Vehicle").createAllHaulage_Driver_VehicleFromList(
    needed_driver_vehicles,haulage.data.Id_haulage
    )
  if(response.status==1)
  {
    logger.info("api.js: all haulage_driver_vehicles created ");
    return res.status(201).json({status: 1, data: {haulage_data:haulage.data,vehicles_data:needed_driver_vehicles}});
  }
  else{
    logger.error("api.js: error creating haulage_driver_vehicles: "+response.error);
    return res.status(500).json({status: -1, error: "Hubo un problema al almacenar los datos de su acarreo"})
  }
});

//Route will be used to handle cancel POST service requests
router.post('/haulage/cancel', function(req, res){
  //TODO cancel service
  res.status(200).json({Api: 'Online'})
});


//Route will be used to handle the drivers schedules GET request
router.get('/driver/schedule', function(req, res){
  res.status(200).json({Api: 'Send driver schedule'})
});

//Route will be used to send the drivers location GET request
router.get('/driver/location', function(req, res){
  res.status(200).json({Api: 'Send driver coordinates'})
});

//Redirect unhandled requests
router.all('*', function(req, res) {
  res.redirect("/");

});


module.exports = router;
