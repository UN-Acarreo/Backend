//Used to avoid CORS errors
const cors = require('cors');
// Call express framework
var express = require('express');
// Import path
const path = require("path");
// Get all functions
var app = express();
//importing routes from api.js
const api = require('./routes/api.js');
const index = require('./routes/index.js');
// Import logger
const logger = require('./utils/logger/logger');
//importr db
const db = require("./DataBase/database");
app.use(function(req,res,next){
  res.header('Access-Control-Allow-Origin: *');
  next();
})

const corsOptions = {
  origin: '*',
  //origin: 'http://127.0.0.1:3000',
};
app.use(express.json({limit: '10mb'}));
//To avoid CORS errors
app.use(cors(corsOptions));

//Use public dirname to serve static files
//app.get("/", express.static(path.join(__dirname, "./public")));
app.use('/uploads/drivers',express.static(path.join(__dirname, 'public/uploads/drivers')));

//Require route files
app.use('/',index);
app.use('/api',api);

// Start server in specific port
app.listen(3001, function(){
  // Actions on ready
  logger.info('Server: Server is running');
});

 //creating all models
User = require("./Models/User");
Driver = require("./Models/Driver");
Vehicle = require("./Models/Vehicle");
Rating = require("./Models/Rating");
Route = require("./Models/Route");
Status = require("./Models/Status");
Cargo = require("./Models/Cargo");
Haulage = require("./Models/Haulage");
Bill = require("./Models/Bill");
Driver_Vehicle = require("./Models/Driver_Vehicle"); 
Haulage_Driver_Vehicle=require("./Models/Haulage_Driver_Vehicle");

async function init_dataBase () {
  try {
  //creating all tables if they dont exist allready
   await User.sync()
   await Driver.sync()
   await Vehicle.sync()
   await Rating.sync()
   await Route.sync()
   await Status.sync()
   await Cargo.sync()
   await Haulage.sync()
   await Bill.sync()
   await Driver_Vehicle.sync()
   await Haulage_Driver_Vehicle.sync()
    //adding constraints
   await db.queryInterface.addConstraint('Status', ['Status_description'], {
    type: 'check',
    where: {
        Status_description: ['In progress', 'Reserved', 'Cancelled', 'Done']
    }
    });
   //await db.sync()
   logger.info("Server: database tables created if the dont exist");
  } catch (err) {
    logger.error("Server: unable to create database tables: "+err)
  }
 }

init_dataBase ()

/*
	- You are able to access to local server by http://localhost:3000/
	- You need use Node.js for run server
*/
