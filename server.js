import express from "express";

import config from "./config/config.js";
import connectExpressServer from "./connections/express.js";
import connectMongoose from "./connections/mongoose.js";

async function startServer() {
  const app = express();

  connectExpressServer(app);
  connectMongoose();

  app.listen(config.port, () => {
    console.log("Server is running on port", config.port);
  }).on("error", () => process.exit(1));
}

startServer();