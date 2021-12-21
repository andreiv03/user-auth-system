import { NextApiRequest, NextApiResponse } from "next";
import { signToken, verifyToken } from "../../../utils/token";

const refreshToken = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const refreshTokenValue = req.cookies.refreshToken;
    if (!refreshTokenValue) return res.status(400).json({ message: "Authentication required!" });

    const decoded = await verifyToken(refreshTokenValue);
    if (!decoded) return res.status(400).json({ message: "Authentication required!" });

    const accessToken = await signToken(decoded.sub, "10m");
    return res.status(200).json({ accessToken });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

export default (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET": return refreshToken(req, res);
    default: return res.status(404).json({ message: "API route not found!" });
  }
}