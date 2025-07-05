const kafka = require("../lib/kafkaClient");

const consumer = kafka.consumer({ groupId: "csv_group" });

const startConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "csv_topic", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      console.log("Consumed Message: ", message.value.toString());
    },
  });
};

startConsumer().catch((error) => {
  console.error("Error in Kafka Consumer: ", error);
  process.exit(1);
});
