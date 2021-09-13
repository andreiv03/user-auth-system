import dotenv from "dotenv";

const env = dotenv.config();
if (env.error) throw new Error("Couldn't find .env file!");

process.env.NODE_ENV = process.env.NODE_ENV || "development";

export default {
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 5000,

  mongodbURI: process.env.MONGODB_URI,

  accessToken: process.env.ACCESS_TOKEN_SECRET,
  refreshToken: process.env.REFRESH_TOKEN_SECRET
}