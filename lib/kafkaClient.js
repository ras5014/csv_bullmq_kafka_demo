const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  brokers: [process.env.KAFKA_HOST || "kafka:9092"],
});
module.exports = kafka;
