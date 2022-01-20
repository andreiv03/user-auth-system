import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";

import { MONGODB_URI } from "../../../constants";

const database = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (mongoose.connection.readyState) return res.status(200).end();
    if (!MONGODB_URI) throw new Error("Database URI not found!");
  
    await mongoose.connect(MONGODB_URI).catch(error => {
      if (error) throw error;
    });
  
    mongoose.connection.on("connected", () => console.log("Mongoose connection established!"));
    mongoose.connection.on("disconnected", () => console.warn("Mongoose connection lost!"));
    mongoose.connection.on("error", error => console.error(`Mongoose connection error:\n${error.stack}`));

    return res.status(200).end();
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET": return database(req, res);
    default: return res.status(404).json({ message: "API route not found!" });
  }
}

export default handler;