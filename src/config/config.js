require("dotenv").config();

const PORT = process.env.PORT;
const SECRET = process.env.SECRET;

const MONGODB_URI =
    process.env.NODE_ENV === "local"
        ? process.env.LOCAL_MONGODB_URI
        : process.env.MONGODB_URI;
const REDIS_URL =
    process.env.NODE_ENV === "local"
        ? process.env.LOCAL_REDIS_URL
        : process.env.REDIS_URL;
const ENVIRONMENT = process.env.ENVIRONMENT;
const AWS_REGION = process.env.AWS_REGION;
const AWS_BUCKET = process.env.AWS_BUCKET;
const AWS_ACCESS = process.env.AWS_ACCESS;
const AWS_SECRET = process.env.AWS_SECRET;
const MONGODB_USER = process.env.MONGODB_USER;
const MONGODB_PASS = process.env.MONGODB_PASS;
let DATABASE_NAME = process.env.DATABASE_NAME;
const LOCAL_DATABASE_NAME = process.env.LOCAL_DATABASE_NAME;

if (ENVIRONMENT === "local") {
    DATABASE_NAME = LOCAL_DATABASE_NAME;
}

module.exports = {
    PORT,
    SECRET,
    MONGODB_URI: ENVIRONMENT === "local" ? MONGODB_URI : MONGODB_URI,
    REDIS_URL,
    ENVIRONMENT,
    AWS_REGION,
    AWS_BUCKET,
    AWS_ACCESS,
    AWS_SECRET,
    MONGODB_USER,
    MONGODB_PASS,
    DATABASE_NAME,
};
