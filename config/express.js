const express = require("express");
const expressFileUpload = require("express-fileupload");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

const routes = require("../api/routes");

module.exports = () => {
  const server = express();

  const corsOptions = {
    origin: process.env.NODE_ENV === "development" && "http://localhost:3000",
    credentials: true
  };

  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  server.use(expressFileUpload({ useTempFiles: true }));
  server.use(cors(corsOptions));
  server.use(cookieParser());
  server.use("/api", routes);

  if (process.env.NODE_ENV === "production") {
    server.use(express.static(path.join(__dirname, "../client/out")));
  }

  return server;
}