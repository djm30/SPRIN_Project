require("dotenv").config();

const PORT = process.env.PORT;
const SECRET = process.env.SECRET;

const MONGODB_URI =
  process.env.NODE_ENV === "local"
    ? process.env.LOCAL_MONGODB_URI
    : process.env.MONGODB_URI;
const REDIS_URL = process.env.REDIS_URL;
const ENVIROMENT = process.env.ENVIROMENT;
const AWS_REGION = process.env.AWS_REGION;
const AWS_BUCKET = process.env.AWS_BUCKET;
const AWS_ACCESS = process.env.AWS_ACCESS;
const AWS_SECRET = process.env.AWS_SECRET;

module.exports = {
  PORT,
  SECRET,
  MONGODB_URI,
  REDIS_URL,
  ENVIROMENT,
  AWS_REGION,
  AWS_BUCKET,
  AWS_ACCESS,
  AWS_SECRET,
};
