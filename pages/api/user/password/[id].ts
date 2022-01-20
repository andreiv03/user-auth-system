import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

import Authorization from "../../../../middleware/authorization";

const changePassword = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await Authorization(req, false);
    const { currentPassword, newPassword } = req.body;

    const { default: UsersModel } = await import("../../../../models/users-model");
    const user = await UsersModel.findById(req.query.id).select("password").lean();
    if (!user) return res.status(400).json({ message: "User not found!" });

    const match = await bcrypt.compare(currentPassword, user.password);
    if (!match) return res.status(400).json({ message: "Incorrect password!" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await UsersModel.updateOne({ _id: req.query.id }, { 
      $set: {
        password: hashedPassword
      }
    });

    return res.status(200).json({ message: "Password changed!" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "PATCH": return changePassword(req, res);
    default: return res.status(404).json({ message: "API route not found!" });
  }
}

export default handler;