require("dotenv").config();

const PORT = process.env.PORT;
const SECRET = process.env.SECRET;
const MONGODB_URI = process.env.MONGODB_URI;
const REDIS_URL = process.env.REDIS_URL;
const ENVIROMENT = process.env.ENVIROMENT;

module.exports = {
  PORT,
  SECRET,
  MONGODB_URI,
  REDIS_URL,
  ENVIROMENT,
};
