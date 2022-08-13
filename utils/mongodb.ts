import { Db, MongoClient } from "mongodb";
import constants from "../constants";

let client: MongoClient;
let database: Db;

export const connectToDatabase = async () => {
  if (client && database)
    return { client, database };

  client = await MongoClient.connect(constants.MONGODB.URI);
  database = client.db(constants.MONGODB.DATABASE_NAME);

  return { client, database };
}