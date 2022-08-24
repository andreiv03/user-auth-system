import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import cookie from "cookie";

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
  };
};

const register = async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
  try {
    const { email, firstName, lastName, password } = req.body;

    const { connectToDatabase } = await import("../../../utils/mongodb");
    const { database } = await connectToDatabase();

    const user = await database.collection("users").findOne({ email });
    if (user) return res.status(400).json({ message: "Email address already registered!" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await database.collection("users").insertOne({
      createdAt: new Date(),
      email,
      firstName,
      lastName,
      password: hashedPassword,
      updatedAt: new Date()
    });

    const { signToken } = await import("../../../utils/token");
    const accessToken = await signToken(newUser.insertedId, "10m");
    const refreshToken = await signToken(newUser.insertedId, "7d");

    res.setHeader("Set-Cookie", cookie.serialize("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development"
    }));

    return res.status(200).json({ accessToken });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "POST": return register(req, res);
    default: return res.status(404).json({ message: "API route not found!" });
  }
}

export default handler;