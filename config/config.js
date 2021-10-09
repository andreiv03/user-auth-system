const dotenv = require("dotenv");

const env = dotenv.config();
if (env.error) throw new Error("Couldn't find .env file!");

process.env.NODE_ENV = process.env.NODE_ENV || "development";

module.exports = {
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 5000,
  clientURL: process.env.CLIENT_URL,
  mongodbURI: process.env.MONGODB_URI,

  accessToken: process.env.ACCESS_TOKEN_SECRET,
  refreshToken: process.env.REFRESH_TOKEN_SECRET,

  admins: process.env.ADMINS.split(" ")
}