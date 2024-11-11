//  Import from packages
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const { errors } = require("celebrate");
const multer = require("multer");
const path = require("path");

// Import rate limiter
const limiter = require("./utils/limiter");

// Import middlewares
const errorHandler = require("./middlewares/error-handler");
const { requestLogger, errorLogger } = require("./middlewares/logger");

//  Import routes index
const routes = require("./routes/index"); //  /index is optional

// Import database adress
const { DATABASE_ADRESS } = require("./utils/config");

//  Connect to database
mongoose.connect(DATABASE_ADRESS);

//  Create express server in app variable
const app = express();
// Configure storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Stores files in 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Generates unique filenames
  },
});

const upload = multer({ storage: storage });

//  App's logic
app.use(limiter); // Protect app from spam attacks
app.use(cors()); // All origins are allowed for tests.
app.use(helmet({ crossOriginResourcePolicy: false })); // Set security headers
app.use(express.json({ limit: "10mb" })); // Adjust the limit as necessary
app.use(express.urlencoded({ limit: "10mb", extended: true })); // For form data

// server.js or app.js
app.post("/api/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  const imageUrl = `/uploads/${req.file.filename}`; // Path to access the image
  res.status(200).json({ imageUrl });
});

app.use("/uploads", express.static("uploads")); // Serve images from 'uploads' folder

app.use(requestLogger); // Log all requests to request.log
app.use("/", routes); // Connect request to the righ endpoint
app.use(errorLogger); // Log all errors to error.log
app.use(errors()); // Use celebrate error handling
app.use(errorHandler); // Generalized error handling

// Configure default port value and activate listening
const { PORT = 3001 } = process.env;
app.listen(PORT, () => {
  console.log(`App is listening on port: ${PORT}`);
});
