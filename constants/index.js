const env = require("dotenv").config();

if (env.error) throw new Error("Couldn't find .env file!");
process.env.NODE_ENV = process.env.NODE_ENV || "development";

module.exports = {
  PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 5000,
  ADMINS: process.env.ADMINS.split(" "),
  JWT_SECRET: process.env.JWT_SECRET,

  // Database
  MONGODB_URI: process.env.MONGODB_URI,

  // Google Drive
  GOOGLE_DRIVE_CLIENT_ID: process.env.GOOGLE_DRIVE_CLIENT_ID,
  GOOGLE_DRIVE_CLIENT_SECRET: process.env.GOOGLE_DRIVE_CLIENT_SECRET,
  GOOGLE_DRIVE_REDIRECT_URI: process.env.GOOGLE_DRIVE_REDIRECT_URI,
  GOOGLE_DRIVE_REFRESH_TOKEN: process.env.GOOGLE_DRIVE_REFRESH_TOKEN
};