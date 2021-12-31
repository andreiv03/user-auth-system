import type { NextApiRequest } from "next";

import UsersModel from "../models/users-model";
import Token from "../utils/token";
import { ADMINS } from "../constants";

const Authorization = async (req: NextApiRequest, adminRequired: boolean) => {
  const authorization = req.headers.authorization;
  if (!authorization) throw new Error("Unauthorized!");

  const decoded = await Token.verifyToken(authorization).catch(() => {
    throw new Error("Unauthorized!");
  });

  const user = await UsersModel.findById(decoded.sub);
  if (!user) throw new Error("User not found!");

  if (adminRequired) {
    if (!ADMINS) throw new Error("Admins list not found!");
    if (!ADMINS.includes(user.email)) throw new Error("Administrator permissions required!");
  }

  return {
    id: user._id
  };
}

export default Authorization;