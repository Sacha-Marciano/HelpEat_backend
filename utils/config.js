const JWT_SECRET =
  process.env.NODE_ENV === "production"
    ? process.env.JWT_SECRET
    : "MyMomSaysIMStrong";

const idRegex = /^\d/;

module.exports = { JWT_SECRET, idRegex };
