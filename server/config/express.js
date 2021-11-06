const express = require("express");
const expressFileUpload = require("express-fileupload");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const routes = require("../api/routes");

module.exports = () => {
  const server = express();
  const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true
  };

  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  server.use(expressFileUpload({ useTempFiles: true }));
  server.use(cors(corsOptions));
  server.use(cookieParser());

  server.use("/api", routes);

  return server;
}