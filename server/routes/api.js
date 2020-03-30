const express = require ('express');
const router = express.Router();


//Route will be used to handle login POST requests
router.post('/api/login/', function(req, res){
  //TODO login user
  res.json({Api: 'Online'})

})


//Route will be used to handle driver sign up POST requests
router.post('/api/driversignup/', function(req, res){
  //TODO sign up driver
  res.json({Api: 'Online'})
});


//Route will be used to handle client sign up POST requests
router.post('/api/clientsignup/', function(req, res){
  //TODO sign up client
  res.json({Api: 'Online'})
});


//Route will be used to handle POST requests of service creation
router.post('/api/createservice/', function(req, res){
  //TODO create service
  res.json({Api: 'Online'})
});


//Route will be used to handle cancel POST service requests
router.post('/api/cancelservice/', function(req, res){
  //TODO cancel service
  res.json({Api: 'Online'})
});


//Route will be used to handle the drivers schedules GET request
router.get('/api/driverschedule/', function(req, res){
  res.json({Api: 'Send driver schedule'})
});


//Route will be used to send the drivers location GET request
router.get('/api/driverlocation/', function(req, res){
  res.json({Api: 'Send driver coordinates'})
});


// Get infromation reacting from the root
router.get('/', function(req, res){
  res.send('Hello world');
});


//Redirect unhandled requests
router.all('*', function(req, res) {
  res.redirect("/");

});


module.exports = router;
