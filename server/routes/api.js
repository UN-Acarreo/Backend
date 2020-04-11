const express = require ('express');
const router = express.Router();

//Route will be used to handle login POST requests
router.post('/login', function(req, res){
  //TODO login user
  res.json({Api: 'Online'})

})

//Route will be used to handle driver sign up POST requests
router.post('/driver-signup', function(req, res){
  
  res.json({Api: 'Online'})
});

const UserController =require('../Controllers/UserController')
//Route will be used to handle client sign up POST requests
router.post('/client-signup',async function(req,res){
  let success = await UserController.createUser(req);
  if(success==1)
  {
    console.log("added succesfully");
    res.status(201).send("added succesfully");
  }
  else{
    console.log(success.message);
    res.status(400).send(success.message);
  }
} );

//Route will be used to handle POST requests of service creation
router.post('/create-service', function(req, res){
  //TODO create service
  res.json({Api: 'Online'})
});


//Route will be used to handle cancel POST service requests
router.post('/cancel-service', function(req, res){
  //TODO cancel service
  res.json({Api: 'Online'})
});


//Route will be used to handle the drivers schedules GET request
router.get('/driver-schedule', function(req, res){
  res.json({Api: 'Send driver schedule'})
});


//Route will be used to send the drivers location GET request
router.get('/driver-location', function(req, res){
  res.json({Api: 'Send driver coordinates'})
});



//Redirect unhandled requests
router.all('*', function(req, res) {
  res.redirect("/");

});


module.exports = router;
