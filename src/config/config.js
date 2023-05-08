require("dotenv").config();

// This file handles retrieving the environment variables from the .env file or the system environment variables

const PORT = process.env.PORT;
const SECRET = process.env.SECRET;

const ENVIRONMENT = process.env.NODE_ENV;

const MONGODB_URI =
    ENVIRONMENT === "local"
        ? process.env.LOCAL_MONGODB_URI
        : process.env.MONGODB_URI;
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
    MONGODB_URI,
    ENVIRONMENT,
    MONGODB_USER,
    MONGODB_PASS,
    DATABASE_NAME,
};
