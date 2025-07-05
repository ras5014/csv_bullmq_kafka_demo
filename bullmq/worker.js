const { Worker } = require("bullmq");
const redis = require("../lib/redisClient");
const fs = require("fs");
const csv = require("csv-parser");
const sendMessage = require("../kafka/producer");

const worker = new Worker(
  "csvQueue",
  async (job) => {
    console.log(`Processing job ${job.id} with data:`, job.data);
    const { filePath } = job.data;

    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", async (row) => {
          try {
            console.log("Producing row to Kafka:", row);
            await sendMessage(row);
          } catch (error) {
            console.error("Error sending message to Kafka:", error.message);
            // Continue processing other rows even if one fails
          }
        })
        .on("end", () => {
          console.log("CSV processing completed.");
          resolve();
        })
        .on("error", (error) => {
          console.error("Error reading CSV file:", error.message);
          reject(error);
        });
    });
  },
  {
    connection: redis,
  }
);

worker.on("ready", () => {
  console.log("Worker is ready to process jobs.");
});
worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed successfully.`);
});
worker.on("failed", (job, err) => {
  console.error(`Job ${job.id} failed: ${err.message}`);
});
