const mongoose = require("mongoose");
const config = require("../config/config.js");

module.exports = () => {
  const URI = config.mongodbURI;
  const options = {
    autoIndex: false,
    connectTimeoutMS: 30000,
    socketTimeoutMS: 30000 * 3,
    serverSelectionTimeoutMS: 10000,
    heartbeatFrequencyMS: 1500
  };

  mongoose.connect(URI, options).catch(error => {
    if (error) throw error;
  });

  mongoose.Promise = global.Promise;

  mongoose.connection.on("connected", () => console.log("Mongoose has successfully connected!"));
  mongoose.connection.on("error", error => console.error(`Mongoose connection error:\n${error.stack}`));
  mongoose.connection.on("disconnected", () => console.warn("Mongoose connection lost!"));
}