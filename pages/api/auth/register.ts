import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import cookie from "cookie";

import Users from "../../../models/users-model";
import connectDatabase from "../../../utils/database";
import { signToken } from "../../../utils/token";

const register = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const user = await Users.findOne({ email });
    if (user) return res.status(400).json({ message: "Email address already registered!" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await Users.create({
      firstName,
      lastName,
      email,
      password: hashedPassword
    });

    const accessToken = await signToken(newUser._id, "10m");
    const refreshToken = await signToken(newUser._id, "7d");

    res.setHeader("Set-Cookie", cookie.serialize("refreshToken", refreshToken, {
      path: "/api/auth/refresh-token",
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
      sameSite: "none",
      secure: true
    }));

    return res.status(200).json({ accessToken });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDatabase();
  
  switch (req.method) {
    case "POST": return register(req, res);
    default: return res.status(404).json({ message: "API route not found!" });
  }
}