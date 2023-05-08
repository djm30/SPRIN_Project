/* eslint-disable */
// Creates a user for the database with read write permissions for only the application database
// NOTE: This script will only run if the MONGO_INITDB_ROOT_USERNAME and MONGO_INITDB_ROOT_PASSWORD environment variables are set
// in the docker-compose.yml file
db = db.getSiblingDB("databaseName");
db.createUser({
    user: "user",
    pwd: "password",
    roles: [{ role: "readWrite", db: "databaseName" }],
});
