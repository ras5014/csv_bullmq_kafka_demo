const express = require("express");
const multer = require("multer");
const path = require("path");
const csvQueue = require("./bullmq/queue"); // Adjust the path as necessary

const app = express();

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

require("./bullmq/worker");

app.post("/upload", upload.single("file"), async (req, res) => {
  console.log("File uploaded: ", req.file.path);
  const filePath = req.file.path;
  await csvQueue.add("processCSV", { filePath });
  res
    .status(200)
    .json({ message: "File uploaded and job added to queue", filePath });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
  console.log("Upload endpoint: http://localhost:3000/upload");
});
