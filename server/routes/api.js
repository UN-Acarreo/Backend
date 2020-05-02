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
  is_valid = true
  data = req.body.request
  Object.keys(data).forEach(function(key) {
    var field = data[key]
    if((key == 'User_name' || key == 'User_last_name' || key == 'Driver_name' || key == 'Driver_last_name')
        && !validator.isAlpha(validator.blacklist(field, ' '))){
        logger.info('Check field: Field must contain only letters')
       is_valid = false
    }
    if((key == 'Identity_card') && !validator.isNumeric(field)){
       logger.info('Check field: Field must be a valid document')
       is_valid = false
    }
    if((key == 'User_Email' || key == 'Driver_Email') && !validator.isEmail(field)){
       logger.info('Check field: Field must be a valid email')
       is_valid = false
    }
    //length validation
    if(field.length == 0){
      logger.info("Check field: Field can't be empty")
      is_valid = false
    }
  })
  logger.info("Check field: Field is valid")
  return is_valid;
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
          logger.error("Save image: Image saved succesfully")
          return true
          //return {filename, localPath};
        }
        catch(err){
          logger.error("Save image: " + err)
          return false
        }

    }


//Route will be used to handle login POST requests
router.post('/login', function(req, res){
  //TODO login user using Oauth
  res.status(200).json({Api: 'Online'})

})

//Route will be used to handle driver sign up POST requests
router.post('/driver/signup', async function(req, res){
  const valid_fields = await check_fields(req);
  if(valid_fields == false){
     logger.info('Signup driver: Error in the supplied data')
     return res.status(400).json({error: 'Error en los datos suministrados '})
  }
  //Save drivers image
  const filePath = path.join(__dirname, "../public/uploads/drivers/");
  const imageSaved = await saveImage(req.body.request.foto_data, filePath, req.body.request.Identity_card)
  if(imageSaved == false){
      logger.info('Signup driver: Error in the supplied data')
      return res.status(400).json({error: 'Error en los datos suministrados '})
  }

  //Set the path of the saved image on the db field
  var baseImage = req.body.request.foto_data
  const extension = baseImage.substring(baseImage.indexOf("/")+1, baseImage.indexOf(";base64"));
  req.body.request.Driver_photo = '/uploads/drivers/'+req.body.request.Identity_card+"."+extension

  //Save driver on db
  let saved = await DriverController.createDriver(req);
  console.log('variabe: '+saved)
  if(saved.status == 1)
  {
    logger.info("Signup driver: added succesfully");
    //res.status(201).send("added succesfully");
    return res.status(201).json({status: 1, db_driver_id: saved.id});
  }
  else{
    logger.error("Signup driver: " + saved.message);
    return res.status(500).json({error : saved.message});
  }

});


router.post('/vehicle/signup', async function(req, res){
  const valid_fields = await check_fields(req);
  if(valid_fields == false){
     logger.info('Signup vehicle: Error in the supplied data')
     return res.status(400).json({error: 'Error en los datos suministrados '})
  }
  //Save vehicle image
  const filePath = path.join(__dirname, "../public/uploads/vehicles/");
  const imageSaved = await saveImage(req.body.request.foto_data, filePath, req.body.request.Identity_card)
  if(imageSaved == false){
      logger.info('Signup vehicle: Error in the supplied data')
      return res.status(400).json({error: 'Error en los datos suministrados '})
  }

  //Set the path of the saved image on the db field
  var baseImage = req.body.request.foto_data
  const extension = baseImage.substring(baseImage.indexOf("/")+1, baseImage.indexOf(";base64"));
  req.body.request.Photo = '/uploads/vehicles/'+req.body.request.Identity_card+"."+extension

  //Save vehicle on db
  let saved_vehicle = await VehicleController.createVehicle(req);
  //error saving the vehicle
  if(saved_vehicle.status != 1 && saved_vehicle.message){
     logger.error("Signup vehicle: " + saved_vehicle.message);
     return res.status(500).json({error : saved_vehicle.message});
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
  if(valid_fields == false){
     logger.info('Signup client: Error in the supplied data')
     return res.status(400).json({error: 'Error en los datos suministrados'})
  }

  let success = await UserController.createUser(req);
  if(success==1)
  {
    logger.info("Signup client: added succesfully");
    //res.status(201).send("added succesfully");
    return res.status(201).json({status: 1});
  }
  else{
    logger.error("Signup client: " + success.message);
    res.status(500).json({error : success.message});
  }
}); 

//Route will be used to handle POST requests of service creation
router.post('/service/create', function(req, res){
  //TODO create service
  res.status(200).json({Api: 'Online'})
});


//Route will be used to handle cancel POST service requests
router.post('/service/cancel', function(req, res){
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
