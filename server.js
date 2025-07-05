const express = require("express");
const multer = require("multer");
const path = require("path");
const csvQueue = require("./bullmq/queue"); // Adjust the path as necessary

const app = express();

// Basic middleware
app.use(express.json());

// Test endpoint
app.get("/", (req, res) => {
  res.json({ 
    message: "CSV Upload Server", 
    endpoints: {
      upload: "POST /upload (multipart/form-data with 'file' field)",
      test: "GET /"
    }
  });
});

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
  try {
    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({ 
        error: "No file uploaded. Please upload a file with field name 'file'" 
      });
    }

    console.log("File uploaded: ", req.file.path);
    const filePath = req.file.path;
    
    // Add job to queue
    await csvQueue.add("processCSV", { filePath });
    
    res.status(200).json({ 
      message: "File uploaded and job added to queue", 
      filePath,
      filename: req.file.filename,
      originalname: req.file.originalname
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ 
      error: "Failed to process file upload", 
      details: error.message 
    });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
  console.log("Upload endpoint: http://localhost:3000/upload");
});
