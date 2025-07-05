const { Queue } = require("bullmq");
const redis = require("../lib/redisClient");

const queue = new Queue("csvQueue", { connection: redis });

module.exports = queue;
