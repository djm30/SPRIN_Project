const redis = require("redis");
// Setup dotenv
require("dotenv").config();

const createConnection = () => {
  return redis.createClient({ url: process.env.REDIS_URL, legacyMode: true });
};

module.exports = createConnection;
