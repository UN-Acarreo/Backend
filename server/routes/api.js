const express = require ('express');
const router = express.Router();

//Setup Database connection
const initOptions = {
    schema: 'public'
};

const pgp = require('pg-promise')(initOptions);
const connection = {
    host: 'localhost', // server name or IP address;
    port: 5432,
    database: 'UN-Acarreo',
    user: 'postgres',
    password: 'admin',
};

const db = pgp(connection); // database instance;
//end of the setup of database connection

async function getInfo(){
  //Select and return information
  var info = await db.any('SELECT * FROM "User"');
  return info;
}

async function insertUser(user){
  //insert user
  var insertion = await db.none('INSERT INTO "User"("User_name", "User_last_name", "User_password","User_addresss","User_E-mail")' +
                                ' VALUES(${name}, ${lastname}, ${password},${address},${email})', user);
  return;

}

//test insertion
router.get('/insertuser', async function(req, res){
  //The variable user can be changed in order to test user insertion with different data
  var user = {name: 'Esteban', lastname: 'Jaramillo', password: '123456', address: 'cll fake 123', email: 'v@v.com'}
  await insertUser(user);
  res.json({Respuesta: 'Usuario insertado'})
});

//test get info
router.get('/getinfo', async function(req, res){
  var info = await getInfo()
  console.log(info)
  res.json(info)
});



//Route will be used to handle login POST requests
router.post('/login', function(req, res){
  //TODO login user
  res.json({Api: 'Online'})

})


//Route will be used to handle driver sign up POST requests
router.post('/driver-signup', function(req, res){
  
  res.json({Api: 'Online'})
});


//Route will be used to handle client sign up POST requests
router.post('/client-signup', async function(req, res){
  //TODO sign up client
  let user = req.body.request;
  await insertUser(user);
  console.log(req.body.request); //Here should come the user data
  res.json({Api: 'Online'})
});


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
