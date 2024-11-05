//  Import from packages
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//  Import routes index
const routes = require("./routes/index"); //  /index is optional

// Import middlewares
const { errors } = require("celebrate");
const errorHandler = require("./middlewares/error-handler");
const { requestLogger, errorLogger } = require("./middlewares/logger");

//  Connect to database
mongoose.connect("mongodb://127.0.0.1:27017/HelpEat_db");

//  Create express server in app variable
const app = express();

//  App's logic
app.use((req, res, next) => {
  req.user = {
    _id: "672a0b662cb47939ba3433be",
  };
  next();
});
app.use(cors()); //  All origins are allowed for tests.
app.use(express.json()); //  Convert request to JSON.
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
