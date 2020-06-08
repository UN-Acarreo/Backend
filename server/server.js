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
app.use(express.static(__dirname + '/public'));
//app.use('/uploads/drivers',express.static(path.join(__dirname, 'public/uploads/drivers')));

//Require route files
app.use('/',index);
app.use('/api',api);

// Start server in specific port
app.listen(3001, function(){
  // Actions on ready
  logger.info('Server: Server is running');
});

// Import ModelFactory
let ModelFactory = require('./Models/ModelFactory');

async function init_dataBase () {
  try {

    //creating all tables if they dont exist allready
    await ModelFactory.getModel("User").sync()
    await ModelFactory.getModel("Driver").sync()
    await ModelFactory.getModel("Vehicle").sync()
    await ModelFactory.getModel("Rating").sync()
    await ModelFactory.getModel("Route").sync()
    await ModelFactory.getModel("Status").sync()
    await ModelFactory.getModel("Cargo").sync()
    await ModelFactory.getModel("Haulage").sync()
    await ModelFactory.getModel("Bill").sync()
    await ModelFactory.getModel("Driver_Vehicle").sync()
    await ModelFactory.getModel("Haulage_Driver_Vehicle").sync()
    await ModelFactory.getModel("Notification_Type").sync()
    await ModelFactory.getModel("User_Notification").sync()
    await ModelFactory.getModel("Driver_Notification").sync()

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
