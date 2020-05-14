const express = require ('express');
const router = express.Router();
const fs = require("fs");
const path = require("path");
var validator = require('validator');

// Import logger
const logger = require('./../utils/logger/logger');

//Controllers definition
const UserController = require('../Controllers/UserController')
const DriverController = require('../Controllers/DriverController')
const VehicleController = require('../Controllers/VehicleController')
const RatingController = require('../Controllers/RatingController')
const RouteController =  require('../Controllers/RouteController')
const StatusController = require('../Controllers/StatusController')
const CargoController = require('../Controllers/CargoController')
const BillController = require('../Controllers/BillController')
const Driver_Vehicle_Controller = require('../Controllers/Driver_VehicleController')
const HaulageController = require('../Controllers/HaulageController')
const Haulage_Driver_VehicleController = require('../Controllers/Haulage_Driver_VehicleController')


//Function used to check the request fields (valid emails, valid field lengths and valid text fields)
async function check_fields(req){
  data = req.body.request
  for (const key of Object.keys(data)) {
    field = data[key]
    fieldName = ""
    if((key == 'User_name' || key == 'Driver_name')
        && !validator.isAlpha(validator.blacklist(field, ' '))){
        logger.info('Check field: Name "' + field + '" invalid')
        fieldName = "Nombre"
        return "El Nombre no es válido"
    }
    if((key == 'User_last_name' || key == 'Driver_last_name')
        && !validator.isAlpha(validator.blacklist(field, ' '))){
        logger.info('Check field: Lastname "' + field + '" invalid')
        fieldName = "Apellido"
        return "El Apellido no es válido"
    }
    if((key == 'Driver_password' || key == 'User_password')){
        fieldName = "Contraseña"
    }
    if((key == 'Driver_address' || key == 'User_address')){
        fieldName = "Dirección"
    }
    if((key == 'Identity_card') && !validator.isNumeric(field)){
       logger.info('Check field: Identity card "' + field + '" invalid')
       fieldName = "Cédula"
       return "La Cédula no es válida"
    }
    if((key == 'Driver_phone') && !validator.isNumeric(field)){
      logger.info('Check field: Phone "' + field + '" invalid')
      fieldName = "Teléfono"
      return "El Teléfono no es válido"
    }
    if((key == 'User_Email' || key == 'Driver_Email') && !validator.isEmail(field)){
       logger.info('Check field: E-Mail "' + field + '" invalid')
       fieldName = "E-Mail"
       return "El E-Mail no es válido"
    }
    if((key == 'Plate')){
      fieldName = "Placa"
    }
    if((key == 'Brand')){
      fieldName = "Marca"
    }
    if((key == 'Model')){
      fieldName = "Modelo"
    }
    if((key == 'Payload_capacity') && !validator.isNumeric(field)){
      logger.info('Check field: Payload capacity "' + field + '" invalid')
      fieldName = "La capacidad de carga"
      return "La capacidad de carga no es válida"
    }
    //length validation
    if(field.length == 0){
      logger.info("Check field: Field can't be empty")
      return "El campo '" + fieldName + "' no puede estar vacio"
    }
  }
  logger.info("Check field: Field is valid")
  return true;
}

async function saveImage(baseImage, path, img_name) {
        //Find extension of file
        try{
          const ext = baseImage.substring(baseImage.indexOf("/")+1, baseImage.indexOf(";base64"));
          const fileType = baseImage.substring("data:".length,baseImage.indexOf("/"));
          //Forming regex to extract base64 data of file.
          const regex = new RegExp(`^data:${fileType}\/${ext};base64,`, 'gi');
          //Extract base64 data.
          const base64Data = baseImage.replace(regex, "");
          //Set filename and extension
          const filename = img_name+"."+ext
          const fullpath = path + filename

          //write the file
          fs.writeFileSync(fullpath, base64Data, 'base64');
          logger.info("Save image: Image saved succesfully")
          return true
          //return {filename, localPath};
        }
        catch(err){
          logger.error("Save image: " + err)
          return false
        }

    }



//Route will be used to handle login POST requests


router.post('/log-client-errors', async function(req, res){

  let error = req.body.error.message;
  let errorInfo = req.body.error.stack;
  console.log(req.body.message);
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
  const valid_fields = await check_fields(req);
  if(valid_fields !== true){
     return res.status(400).json({status:-2, error: valid_fields})
  }
  if(type_of_user=="client")
  {
    //Client login
    let {status,data} = await UserController.validateUser(req);
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

    let {status,data} = await DriverController.validateDriver(new_req);

    if(status==1)
    {
      logger.info("api.js: returned Driver id succesfully")
      return res.status(200).json({status: 1, db_driver_id: data});

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
  const valid_fields = await check_fields(req);
  if(valid_fields !== true){
     return res.status(400).json({error: valid_fields})
  }
  //Save drivers image
  const filePath = path.join(__dirname, "../public/uploads/drivers/");
  const imageSaved = await saveImage(req.body.request.foto_data, filePath, req.body.request.Identity_card)
  if(imageSaved == false){
      logger.info('Signup driver: Error in save image')
      return res.status(400).json({error: 'No se puede guardar la imagen seleccionada'})
  }

  //Set the path of the saved image on the db field
  var baseImage = req.body.request.foto_data
  const extension = baseImage.substring(baseImage.indexOf("/")+1, baseImage.indexOf(";base64"));
  req.body.request.Driver_photo = '/uploads/drivers/'+req.body.request.Identity_card+"."+extension

  //Save driver on db
  let saved = await DriverController.createDriver(req);
  //console.log('variabe: '+saved)
  if(saved.status == 1)
  {
    logger.info("Signup driver: added succesfully");
    return res.status(201).json({status: 1, db_driver_id: saved.id});
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
  const valid_fields = await check_fields(req);
  if(valid_fields !== true){
     return res.status(400).json({error: valid_fields})
  }
  //Save vehicle image
  const filePath = path.join(__dirname, "../public/uploads/vehicles/");
  const imageSaved = await saveImage(req.body.request.foto_data, filePath, req.body.request.Identity_card)
  if(imageSaved == false){
      logger.info('Signup driver: Error in save image')
      return res.status(400).json({error: 'No se puede guardar la imagen seleccionada'})
  }

  //Set the path of the saved image on the db field
  var baseImage = req.body.request.foto_data
  const extension = baseImage.substring(baseImage.indexOf("/")+1, baseImage.indexOf(";base64"));
  req.body.request.Photo = '/uploads/vehicles/'+req.body.request.Identity_card+"."+extension

  //Save vehicle on db
  let saved_vehicle = await VehicleController.createVehicle(req);
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
  let success_driver_vehicle = await Driver_Vehicle_Controller.createDriver_Vehicle(req.body.request.db_driver_id, saved_vehicle.id, req.body.request.Is_owner)


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
  const valid_fields = await check_fields(req);
  if(valid_fields !== true){
     return res.status(400).json({error: valid_fields})
  }

  let success = await UserController.createUser(req);
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
//returns -1 if error creating route
router.post('/haulage/create', async function(req, res){
  
  const valid_fields = await check_fields(req);
  if(valid_fields !== true){
     return res.status(400).json({error: valid_fields})
  }
  let haulage_created= {status: false, data: false};
  //creating new route
  values = req.body.request;
  let route = await RouteController.createRoute({
    Origin_coord: values.Origin_coord, Destination_coord: values.Destination_coord
  });
  if(route.status==1)
  {
    //route created, creating cargo
    let cargo = await CargoController.createCargo({
      Weight: values.Weight, Description: values.Description, Comments: values.Comments
    });
    if(cargo.status==1)
    {
      //cargo created, creating haulage
      let haulage = await HaulageController.createHaulage({
        Date: values.Date, Id_user: values.Id_user, Id_route: route.data, Id_cargo: cargo.data
      });
      if(haulage.status == 1)
      {
        logger.info("api.js: Haulage created successfully")
        haulage_created = {status: true, data: haulage.data};
      }
      else{
        logger.error("api.js: Could not create haulage: "+ cargo.error)
        return res.status(500).json({status: -1, error: "Hubo un problema registrado en la reserva de su acarreo"});
      }
    }
    else{
      logger.error("api.js: Could not create haulage: "+ cargo.error)
      return res.status(500).json({status: -1, error: "Hubo un problema registrado la carga de su acarreo"});
    }
  }
  else
  {
    logger.error("api.js: Could not create haulage: "+ route.error)
    return res.status(500).json({status: -1, error: "Hubo un problema creando la ruta de su acarreo"});
  }
  if(haulage_created.status==true)
  {
    return res.status(201).json({status: 1, data: haulage_created.data});
    //now we have to assign driver, this is done bellow the nested ifs
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
