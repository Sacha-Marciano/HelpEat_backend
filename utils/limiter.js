const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // in 15 minutes
  max: 100, // you can make a maximum of 100 requests from one IP
});

module.exports = limiter;
