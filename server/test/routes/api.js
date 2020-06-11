
// Import Assert
var assert = require("assert");
var httpMocks  = require('node-mocks-http');

// Import api.js for test
api = require("../../routes/api");

describe("Log client errors:", async function(){
  
  // {body: {error: {message: Object, stack: Object}}}
  it('Should return Bad Request when not have "error" key', async function(){
    
    req = httpMocks.createRequest({method: 'POST', url: '/log-client-errors'});
    res = httpMocks.createResponse();

    emmitter = await api.logClientErrors(req, res)

    emitter.on("sayHello", function(e) {
        e.message += " World";              // Modifying the state
    });

    console.log(await api.logClientErrors(req, res).statusMessage)
    assert.equal(200, await api.logClientErrors(req, res).statusCode);

  })

});