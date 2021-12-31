import type { NextApiRequest, NextApiResponse } from "next";

import Authorization from "../../../middleware/authorization";
import UsersModel from "../../../models/users-model";
import connectDatabase from "../../../utils/database";
import { ADMINS } from "../../../constants";

const getUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const authorization = await Authorization(req, false);
    if (!ADMINS) throw new Error("Admins list not found!");

    const user = await UsersModel.findById(authorization.id).select("firstName lastName email phoneNumber").select("-password");
    if (!user) return res.status(400).json({ message: "User not found!" });

    return res.status(200).json({
      ...user.toObject(),
      isAdmin: ADMINS.includes(user.email)
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDatabase();

  switch (req.method) {
    case "GET": return getUser(req, res);
    default: return res.status(404).json({ message: "API route not found!" });
  }
}

export default handler;