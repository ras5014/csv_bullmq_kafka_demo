const Redis = require("ioredis");

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT || 6379,
  maxRetriesPerRequest: null, // Disable automatic retries
});

module.exports = redis;
