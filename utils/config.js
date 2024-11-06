const JWT_SECRET =
  process.env.NODE_ENV === "production"
    ? process.env.JWT_SECRET
    : "MyMomSaysIMStrong";

const DATABASE_ADRESS =
  process.env.NODE_ENV === "production"
    ? process.env.DATABASE_ADRESS
    : "mongodb://127.0.0.1:27017/HelpEat_db";

const idRegex = /^\d/;

module.exports = { JWT_SECRET, DATABASE_ADRESS, idRegex };
