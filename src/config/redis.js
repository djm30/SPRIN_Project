const redis = require("redis");
const logger = require("./logger");
// Setup dotenv
require("dotenv").config();

// All this does is return a redisClient object, which is a client for the redis server.
const createConnection = () => {
  logger.info("Connected to redis");
  return redis.createClient({ url: process.env.REDIS_URL, legacyMode: true });
};

module.exports = createConnection;
