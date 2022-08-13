import type { NextApiRequest, NextApiResponse } from "next";

const refreshToken = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const refreshTokenCookie = req.cookies.refreshToken;
    if (!refreshTokenCookie) return res.status(400).json({ message: "Authentication required!" });

    const { signToken, verifyToken } = await import("../../../utils/token");
    const decoded = await verifyToken(refreshTokenCookie);
    if (!decoded) return res.status(400).json({ message: "Authentication required!" });

    const accessToken = await signToken(decoded.sub, "10m");
    return res.status(200).json({ accessToken });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET": return refreshToken(req, res);
    default: return res.status(404).json({ message: "API route not found!" });
  }
}

export default handler;