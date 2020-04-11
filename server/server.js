//Used to avoid CORS errors
const cors = require('cors');
// Call express framework
var express = require('express');
// Get all functions
var app = express();
//importing routes from api.js
const api = require('./routes/api.js');
const index = require('./routes/index.js');

app.use(function(req,res,next){
  res.header('Access-Control-Allow-Origin: *');
  next();
})

const corsOptions = {
  origin: '*',
  //origin: 'http://127.0.0.1:3000',
};
app.use(express.json());
//To avoid CORS errors
app.use(cors(corsOptions));


//Require route files
app.use('/',index);
app.use('/api',api);

// Start server in specific port
app.listen(3001, function(){
	// Actions on ready
  	console.log('Server ready!');

});

/*
	- You are able to access to local server by http://localhost:3000/
	- You need use Node.js for run server
*/
