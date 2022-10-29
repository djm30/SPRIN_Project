const Logger = require("../config/logger");
require("dotenv").config();

// This middleware catches any uncaught errors during the request response cycle
// Will try to return an error message assoicated with the error thrown otherwise
// will return a 500 internal server error
const errorHandler = (error, req, res, next) => {
  if (process.env.NODE_ENV !== "test")
    Logger.error(`${error.name}: ${error.message}`);

  if (error.name === "CastError") {
    res.status(400).json({ message: "Please provide a valid ObjectID" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ message: error.message });
  } else if (error.name === "TypeError") {
    return res.status(400).json({ message: "Please provide valid data" });
  } else {
    res.status(500).json({ message: "An error occured on our side! Sorry!" });
  }
};

module.exports = errorHandler;
