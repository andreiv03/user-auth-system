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

    // Pages
    server.get("/", (req, res) => {
      res.sendFile(path.join(__dirname, "..client/out/index.html"));
    });

    server.get("/login", (req, res) => {
      res.sendFile(path.join(__dirname, "..client/out/login.html"));
    });

    server.get("/register", (req, res) => {
      res.sendFile(path.join(__dirname, "..client/out/register.html"));
    });

    server.get("/settings", (req, res) => {
      res.sendFile(path.join(__dirname, "..client/out/settings.html"));
    });

    server.get("/404", (req, res) => {
      res.sendFile(path.join(__dirname, "..client/out/404.html"));
    });
  }

  return server;
}