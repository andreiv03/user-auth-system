import type { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";

import { User } from "../../../context/auth.context";

const unknownUser: User = {
  _id: "",
  createdAt: "",
  email: "",
  firstName: "",
  lastName: "",
  updatedAt: ""
};

const getUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) return res.status(200).json(unknownUser);

    const { verifyToken } = await import("../../../utils/token");
    const decoded = await verifyToken(authorizationHeader);

    const { connectToDatabase } = await import("../../../utils/mongodb");
    const { database } = await connectToDatabase();

    const user = await database.collection("users").findOne({ _id: new ObjectId(decoded.sub as string) });
    if (!user) return res.status(400).json({ message: "User not found!" });

    return res.status(200).json({ ...user, password: undefined });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET": return getUser(req, res);
    default: return res.status(404).json({ message: "API route not found!" });
  }
}

export default handler;