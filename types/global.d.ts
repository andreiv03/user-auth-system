import { MongoClient } from "mongodb";

declare global {
  var _mongodbClientPromise: Promise<MongoClient>;
};