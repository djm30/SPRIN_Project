const mongoose = require("mongoose");
const Logger = require("../src/config/logger");
require("dotenv").config;

const connectToDatabase = () => {
  mongoose
    .connect(process.env.TEST_MONGODB_URI)
    .then(() => {
      Logger.info("Mongoose Connected");
    })
    .catch((e) => {
      Logger.error(`Some error: ${e}`);
    });
};

const getUserAuthCookie = (api) => {};
const getAdminAuthCookie = (api) => {};

module.exports = { connectToDatabase };
