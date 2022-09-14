const redis = require("redis");
// Setup dotenv
require("dotenv").config();

// All this does is return a redisClient object, which is a client for the redis server.
const createConnection = () => {
  return redis.createClient({ url: process.env.REDIS_URL, legacyMode: true });
};

module.exports = createConnection;
