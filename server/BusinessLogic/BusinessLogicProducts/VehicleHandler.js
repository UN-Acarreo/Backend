
// Import ControllerFactory
ControllerFactory = require('../../Controllers/ControllerFactory');

// Import logger
const logger = require('../../utils/logger/logger');

// Create vehicle
async function createVehicle(req) 
{
    // Get atributes
    const { Plate, Brand, Model, Payload_capacity, Photo } = req.body.request;

    // Create Vehicle
    var result = await ControllerFactory.getController("Vehicle").create(Plate, Brand, Model, Payload_capacity, Photo)

    if(result.status==1)
    {
      logger.info("VehicleHandler: Vehicle was created successfully.");
      
      return {status: 1, data: result.data}
    }
    logger.error("VehicleHandler: " + result.error);
    return {status: -1, message: result.error};
  }

// get list of needed vehicles
// returns 1 if cars are enough or 0 if weight is to high, also returns needed cars list
function getListOfNeededVehicles(free_vehicles,weight)
{
  var needed_vehicles =[]
  var acum_capacity = 0;
  

  for (const element of free_vehicles) {
    Id_vehicle=element.Id_vehicle;
    Payload_capacity=element.Payload_capacity;
    if(weight>acum_capacity)
    {
      needed_vehicles.push(element)
      acum_capacity = acum_capacity+Payload_capacity
    }
  }
  if(weight>acum_capacity)
  {
    logger.info("VehicleHandler: not enough cars");
    return {status: 0, data:needed_vehicles};
  }
  else{
    logger.info("VehicleHandler:enough cars");
    return {status: 1, data:needed_vehicles};;
  }
}

// Get all vehicles
function getAllVehicles()
{
  return ControllerFactory.getController("Vehicle").getAll();
}

module.exports = {
    getListOfNeededVehicles : getListOfNeededVehicles,
    createVehicle : createVehicle,
    getAllVehicles: getAllVehicles
  };