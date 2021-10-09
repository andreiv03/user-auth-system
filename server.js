const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

const config = require("./config/config.js");
const globalRouter = require("./api/helpers/global-router.js");
const handleMongooseConnection = require("./connections/mongoose.js");

function startServer() {
  const server = express();

  server.use(express.json());
  server.use(cors({ credentials: true, origin: config.clientURL }));
  server.use(cookieParser());
  server.use(fileUpload({ useTempFiles: true }));
  server.use(globalRouter());

  handleMongooseConnection();

  server.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
  }).on("error", () => process.exit(1));
}

startServer();