import mongoose from "mongoose";
import { MONGODB_URI } from "../constants/index";

const connectDatabase = async () => {
  const mongooseOptions = {
    autoIndex: true
  };

  if (mongoose.connection.readyState) return;
  if (!MONGODB_URI) throw new Error("Database URI not found!");

  await mongoose.connect(MONGODB_URI, mongooseOptions).catch(error => {
    if (error) throw error;
  });

  mongoose.Promise = global.Promise;
  mongoose.connection.on("connected", () => console.log("Mongoose has successfully connected!"));
  mongoose.connection.on("error", error => console.error(`Mongoose connection error:\n${error.stack}`));
  mongoose.connection.on("disconnected", () => console.warn("Mongoose connection lost!"));
}

export default connectDatabase;