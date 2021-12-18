const mongoose = require("mongoose");
const { MONGODB_URI } = require("../constants");

module.exports = () => {
  const mongooseOptions = {
    autoIndex: true,
    connectTimeoutMS: 30000,
    socketTimeoutMS: 30000 * 3,
    serverSelectionTimeoutMS: 10000,
    heartbeatFrequencyMS: 1500
  };

  mongoose.connect(MONGODB_URI, mongooseOptions).catch(error => {
    if (error) throw error;
  });

  mongoose.Promise = global.Promise;
  mongoose.connection.on("connected", () => console.log("Mongoose has successfully connected!"));
  mongoose.connection.on("error", error => console.error(`Mongoose connection error:\n${error.stack}`));
  mongoose.connection.on("disconnected", () => console.warn("Mongoose connection lost!"));
}