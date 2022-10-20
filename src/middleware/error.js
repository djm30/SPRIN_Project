const Logger = require("../config/logger");

const errorHandler = (error, req, res, next) => {
  Logger.error(`${error.name}: ${error.message}`);

  if (error.name === "CastError") {
    res.status(400).json({ message: "Please provide a valid ObjectID" });
  } else {
    res.status(500).json({ message: "An error occured on our side! Sorry!" });
  }

  // Specific Error Handlers here
  // E.g
  //   if (error.name === "CastError") {
  //     return response.status(400).json({ error: "malformatted id" });
  //   } else if (error.name === "ValidationError") {
  //     return response.status(400).json({ error: error.message });
};

module.exports = errorHandler;
