import { type Db, MongoClient } from "mongodb";

import { ENV } from "@/config/constants";

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
  var _mongoDb: Db | undefined;
}

export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
  let clientPromise: Promise<MongoClient>;

  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      const client = new MongoClient(ENV.MONGODB_URI);
      global._mongoClientPromise = client.connect();
    }

    clientPromise = global._mongoClientPromise;
  } else {
    clientPromise = new MongoClient(ENV.MONGODB_URI).connect();
  }

  const client = await clientPromise;

  if (!global._mongoDb) {
    global._mongoDb = client.db(ENV.MONGODB_DB);
  }

  return { client, db: global._mongoDb };
}
