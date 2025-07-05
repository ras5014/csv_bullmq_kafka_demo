const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  brokers: ["localhost:29092"],
});
module.exports = kafka;
