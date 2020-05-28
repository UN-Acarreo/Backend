// Import ModelFactory
ModelFactory = require('../../Models/ModelFactory');

// Import logger
const logger = require('../../utils/logger/logger');

//Returns the rating information
async function getRatingInfo(rating_id){
    let rating = await ControllerFactory.getController("Rating").getRatingInfo(rating_id)
    if(rating.status == -1){
      logger.error("Rating Handler: " +rating.data);
      return {status: -1, data: rating.data};
    }
    if(rating.status == 0){
      logger.error("Rating Handler: " +rating.data);
      return {status: 0, data: rating.data};
    }

    return {status: 1, data: rating.data}


}

module.exports = {
    getRatingInfo: getRatingInfo
    };
