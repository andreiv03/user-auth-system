const env = require("dotenv").config();
if (env.error) throw new Error("Couldn't find .env file!");

process.env.NODE_ENV = process.env.NODE_ENV || "development";

module.exports = {
  PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 5000,
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,

  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,

  ADMINS: process.env.ADMINS.split(" ")
};