db = db.getSiblingDB("sprinApplication");
db.createUser({
    user: "expressServerUser",
    pwd: "y@Pfve&&n%chHx6g19G1nh4UUS",
    roles: [{ role: "readWrite", db: "sprinApplication" }],
});
