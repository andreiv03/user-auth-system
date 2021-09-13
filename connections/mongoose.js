import mongoose from "mongoose";
import config from "../config/config.js";

export default () => {
  const URI = config.mongodbURI;
  const options = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  };

  mongoose.connect(URI, options, error => {
    if (error) throw error;
  });

  mongoose.connection.on("connected", () => console.log("Mongoose has successfully connected!"));
  mongoose.connection.on("error", error => console.error(`Mongoose connection error:\n${error.stack}`));
  mongoose.connection.on("disconnected", () => console.warn("Mongoose connection lost!"));
}