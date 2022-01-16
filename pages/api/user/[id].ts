import type { NextApiRequest, NextApiResponse } from "next";

import Authorization from "../../../middleware/authorization";
import UsersModel from "../../../models/users-model";
import connectDatabase from "../../../utils/database";

const updateUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await Authorization(req, false);
    const { firstName, lastName, email, phoneNumber, avatar } = req.body;
      
    const user = await UsersModel.findById(req.query.id);
    if (!user) return res.status(400).json({ message: "User not found!" });

    await UsersModel.findByIdAndUpdate(req.query.id, {
      firstName,
      lastName,
      email,
      phoneNumber,
      avatar
    });

    return res.status(200).json({ message: "Account updated!" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDatabase();

  switch (req.method) {
    case "PATCH": return updateUser(req, res);
    default: return res.status(404).json({ message: "API route not found!" });
  }
}

export default handler;