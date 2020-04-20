const express = require ('express');
const router = express.Router();
const fs = require("fs");
const path = require("path");
var validator = require('validator');

//Controllers definition
const UserController = require('../Controllers/UserController')
const DriverController = require('../Controllers/DriverController')
const VehicleController = require('../Controllers/VehicleController')
const RatingController = require('../Controllers/RatingController')
const RouteController =  require('../Controllers/RouteController')
const StatusController = require('../Controllers/StatusController')
const CargoController = require('../Controllers/CargoController')

/*
this lines give error :(
const BillController = require('../Controllers/BillController')
const Driver_Vehicle_Controller = require('../Controllers/Driver_VehicleController')
const HaulageController = require('../Controllers/HaulageController')
const Haulage_Driver_VehicleController = require('../Controllers/Haulage_Driver_VehicleController')
*/

//Function used to check the request fields (valid emails, valid field lengths and valid text fields)
async function check_fields(req){
  is_valid = true
  data = req.body.request
  Object.keys(data).forEach(function(key) {
    var field = data[key]
    if((key == 'User_name' || key == 'User_last_name' || key == 'Driver_name' || key == 'Driver_last_name')
        && !validator.isAlpha(validator.blacklist(field, ' '))){
       console.log('Field must contain only letters')
       is_valid = false
    }
    if((key == 'Identity_card') && !validator.isNumeric(field)){
       console.log('Field must be a valid document')
       is_valid = false
    }
    if((key == 'User_Email' || key == 'Driver_Email') && !validator.isEmail(field)){
       console.log('Field must be a valid email')
       is_valid = false
    }
    //length validation
    if(field.length == 0){
      console.log("Field can't be empty")
      is_valid = false
    }
  })
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
          return true
          //return {filename, localPath};
        }
        catch(err){
          console.log(err)
          return false
        }

    }


//Route will be used to handle login POST requests
router.post('/login', function(req, res){
  //TODO login user using Oauth
  res.json({Api: 'Online'})

})

//Route will be used to handle driver sign up POST requests
router.post('/driver/signup', async function(req, res){
  const valid_fields = await check_fields(req);
  if(valid_fields == false){
     return res.json({error: 'Error en los datos suministrados '})
  }
  //Save drivers image
  const filePath = path.join(__dirname, "../public/uploads/drivers/");
  const imageSaved = await saveImage(req.body.request.foto_data, filePath, req.body.request.Identity_card)
  if(imageSaved == false){
      return res.json({error: 'Error en los datos suministrados '})
  }

  //Set the path of the saved image on the db field
  var baseImage = req.body.request.foto_data
  const extension = baseImage.substring(baseImage.indexOf("/")+1, baseImage.indexOf(";base64"));
  req.body.request.Driver_photo = '/uploads/drivers/'+req.body.request.Identity_card+"."+extension

  //Save driver on db
  let success = await DriverController.createDriver(req);
  if(success==1)
  {
    console.log("added succesfully");
    res.status(201).send("added succesfully");
  }
  else{
    console.log(success.message);
    res.json({error : success.message});
  }

});


//Route will be used to handle client sign up POST requests
router.post('/client/signup', async function(req,res){
  const valid_fields = await check_fields(req);
  if(valid_fields == false){
     return res.json({error: 'Error en los datos suministrados'})
  }

  let success = await UserController.createUser(req);
  if(success==1)
  {
    console.log("added succesfully");
    res.status(201).send("added succesfully");
  }
  else{
    console.log(success.message);
    res.json({error : success.message});
  }
});

//Route will be used to handle POST requests of service creation
router.post('/service/create', function(req, res){
  //TODO create service
  res.json({Api: 'Online'})
});


//Route will be used to handle cancel POST service requests
router.post('/service/cancel', function(req, res){
  //TODO cancel service
  res.json({Api: 'Online'})
});


//Route will be used to handle the drivers schedules GET request
router.get('/driver/schedule', function(req, res){
  res.json({Api: 'Send driver schedule'})
});


//Route will be used to send the drivers location GET request
router.get('/driver/location', function(req, res){
  res.json({Api: 'Send driver coordinates'})
});



//Redirect unhandled requests
router.all('*', function(req, res) {
  res.redirect("/");

});


module.exports = router;
