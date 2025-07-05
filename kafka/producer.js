const kafka = require("../lib/kafkaClient");

const producer = kafka.producer();

const sendMessage = async (row) => {
  await producer.connect();
  await producer.send({
    topic: "csv_topic",
    messages: [
      {
        value: JSON.stringify(row),
      },
    ],
  });
  await producer.disconnect();
};

module.exports = sendMessage;
