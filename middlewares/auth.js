// Import token handler and key signature
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");

// Import customized error
const UnauthorizedError = require("../utils/errors/UnauthorizedError");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization === "Bearer null" || !authorization.startsWith("Bearer ")) {
    throw new UnauthorizedError("User isn't logged in");
  }

  const token = authorization.replace("Bearer ", "");

  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new UnauthorizedError("Invalid toker");
  }

  req.user = payload;
  return next();
};
