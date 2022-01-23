import type { NextApiRequest } from "next";
import { ADMINS } from "../constants";

const Authorization = async (req: NextApiRequest, adminRequired: boolean) => {
  const authorization = req.headers.authorization;
  if (!authorization) throw new Error("Unauthorized!");

  const { default: Token } = await import("../utils/token");
  const decoded = await Token.verifyToken(authorization).catch(() => {
    throw new Error("Unauthorized!");
  });

  const { default: UsersModel } = await import("../models/users-model");
  const user = await UsersModel.findById(decoded.sub).select("firstName lastName email phoneNumber avatar").select("-password").lean();
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