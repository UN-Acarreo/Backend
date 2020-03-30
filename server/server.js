
// Call express framework
var express = require('express');

// Get all functions
var app = express();

// Get infromation reacting from the root
app.get('/',function(request, response){

	// Actions on getting
  	response.send('Hello world');

});

// Start server in specific port
app.listen(3000, function(){

	// Actions on ready
  	console.log('Server ready');

});

/*
	- You are able to access to local server by http://localhost:3000/
	- You need use Node.js for run server
*/