// Creates a user for the database with read write permissions for only the application database

db = db.getSiblingDB("sprinApplication");
db.createUser({
    user: "user",
    pwd: "password",
    roles: [{ role: "readWrite", db: "databaseName" }],
});
