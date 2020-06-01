
// Import ModelFactory
ModelFactory = require('../../Models/ModelFactory');

// Import logger
const logger = require('../../utils/logger/logger');

//Return rating information
async function getRatingInfo(rating_id){
    try{
    var RatingModel = await ModelFactory.getModel("Rating")
    let rating_info = await RatingModel.findAll(
        { where: { Id_rating: rating_id } }
        )
    //query returns array of rating info that match where clause, in this case we expect only 1
    if(rating_info.length==0)
    {
        logger.info("RatingController: No rating information found with that id")
        return {status:0, data:" El servicio no ha sido calificado"}
    }
    else{
        logger.info("RatingController: rating info found")
        return {status: 1, data: rating_info[0].dataValues}
    }

  } catch (error) {
    logger.info("RatingController: "+ error)
    return {status:-1, data: error}
    }
}

// Create Rating
async function create(req) {

    try {

        // Get atributes
        const { Puntuality, Cargo_state, Customer_support, Comments } = req.body.request;

        // Create Rating
        await ModelFactory.getModel("Rating").create(
            {
                Puntuality: Puntuality,
                Cargo_state: Cargo_state,
                Customer_support: Customer_support,
                Comments: Comments
            }
        );
        logger.info("RatingController: Rating was created successfully.");
        return 1;

    } catch (error) {
        logger.error("RatingController: " + error);
        return error;
    }

}

module.exports = { create: create, getRatingInfo: getRatingInfo };
