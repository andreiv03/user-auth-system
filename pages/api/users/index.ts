import { NextApiRequest, NextApiResponse } from "next";

import Authorization from "../../../middleware/authorization";
import Users from "../../../models/users-model";
import connectDatabase from "../../../utils/database";
import { ADMINS } from "../../../constants";

const getUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const authorization = await Authorization(req, false);

    const user = await Users.findById(authorization.id).select("firstName lastName email phoneNumber").select("-password");
    if (!user) return res.status(400).json({ message: "User not found!" });
    if (!ADMINS) return res.status(400).json({ message: "Admins list not found!" });

    return res.status(200).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      isAdmin: ADMINS.includes(user.email)
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDatabase();

  switch (req.method) {
    case "GET": return getUser(req, res);
    default: return res.status(404).json({ message: "API route not found!" });
  }
}