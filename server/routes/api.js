const express = require ('express');
const router = express.Router();

//Controllers definition


const UserController = require('../Controllers/UserController')
const DriverController = require('../Controllers/DriverController')
const VehicleController = require('../Controllers/VehicleController')
const RatingController = require('../Controllers/RatingController')
const RouteController =  require('../Controllers/RouteController')
const StatusController = require('../Controllers/StatusController')
const CargoController = require('../Controllers/CargoController')


/*
const BillController = require('../Controllers/BillController')
const Driver_Vehicle_Controller = require('../Controllers/Driver_VehicleController')
const HaulageController = require('../Controllers/HaulageController')
const Haulage_Driver_VehicleController = require('../Controllers/Haulage_Driver_VehicleController')
*/


//Route will be used to handle login POST requests
router.post('/login', function(req, res){
  //TODO login user
  res.json({Api: 'Online'})

})

//Route will be used to handle driver sign up POST requests
router.post('/driver/signup', function(req, res){

  res.json({Api: 'Online'})
});


//Route will be used to handle client sign up POST requests
router.post('/client/signup',async function(req,res){
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
} );

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
