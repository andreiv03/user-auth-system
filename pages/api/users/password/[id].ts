import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

import Authorization from "../../../../middleware/authorization";
import Users from "../../../../models/users-model";
import connectDatabase from "../../../../utils/database";

const changePassword = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await Authorization(req, false);
    const { currentPassword, newPassword } = req.body;

    const user = await Users.findById(req.query.id);
    if (!user) return res.status(400).json({ message: "User not found!" });

    const match = await bcrypt.compare(currentPassword, user.password);
    if (!match) return res.status(400).json({ message: "Incorrect password!" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await Users.findByIdAndUpdate(req.query.id, { password: hashedPassword });

    return res.status(200).json({ message: "Password changed!" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDatabase();

  switch (req.method) {
    case "PATCH": return changePassword(req, res);
    default: return res.status(404).json({ message: "API route not found!" });
  }
}