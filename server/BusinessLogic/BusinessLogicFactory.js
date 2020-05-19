
// Pattern Design Factory to allow BusinessLogic access
class BusinessLogicFactory {

    // Get controller acording to String type
    static getBusinessLogic(type) {
        switch (type) {
            case "Driver_Vehicle":
                return require("./BusinessLogicProducts/Driver_VehicleHandler");
            case "Driver":
                return require("./BusinessLogicProducts/DriverHandler");
            case "Fields":
                return require("./BusinessLogicProducts/FieldsHandler");
            case "Haulage_Driver_Vehicle":
                return require("./BusinessLogicProducts/Haulage_Driver_VehicleHandler");
            case "Haulage":
                return require("./BusinessLogicProducts/HaulageHandler");
            case "Image":
                return require("./BusinessLogicProducts/ImageHandler");
            case "User":
                return require("./BusinessLogicProducts/UserHandler");
            case "Vehicle":
                return require("./BusinessLogicProducts/VehicleHandler");
            default:
                return null;
        }
    };
}

module.exports = BusinessLogicFactory;