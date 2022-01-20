import type { NextApiRequest, NextApiResponse } from "next";
import Authorization from "../../../middleware/authorization";

const updateUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await Authorization(req, false);
    const { firstName, lastName, email, phoneNumber, avatar } = req.body;

    const { default: UsersModel } = await import("../../../models/users-model");
    await UsersModel.updateOne({ _id: req.query.id }, {
      $set: {
        firstName,
        lastName,
        email,
        phoneNumber,
        avatar
      }
    });

    return res.status(200).json({ message: "Account updated!" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "PATCH": return updateUser(req, res);
    default: return res.status(404).json({ message: "API route not found!" });
  }
}

export default handler;