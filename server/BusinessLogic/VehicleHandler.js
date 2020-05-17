// Import logger
const logger = require('./../utils/logger/logger');
//returns 1 if cars are enough or 0 if weight is to high, also returns needed cars list
function getListOfNeededVehicles(free_vehicles,weight)
{
  var needed_vehicles =[]
  var acum_capacity = 0;
  console.log("weight: "+weight);
  free_vehicles.forEach(element => {
    Id_vehicle=element.Id_vehicle;
    Payload_capacity=element.Payload_capacity;
    if(weight>acum_capacity)
    {
      needed_vehicles.push(element)
      acum_capacity = acum_capacity+Payload_capacity
    }
  });
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


module.exports = {
    getListOfNeededVehicles : getListOfNeededVehicles
  };