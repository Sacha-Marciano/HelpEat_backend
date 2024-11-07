//  Import from packages
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const { errors } = require("celebrate");

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

//  App's logic
// app.use(limiter); // Protect app from spam attacks
// app.use(helmet()); // Set security headers
app.use(cors()); // All origins are allowed for tests.
app.use(express.json()); // Convert request to JSON.
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
