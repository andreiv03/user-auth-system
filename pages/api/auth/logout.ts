import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

const logout = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    res.setHeader("Set-Cookie", cookie.serialize("refreshToken", "", {
      path: "/api/auth/refresh-token",
      maxAge: -1,
    }));

    return res.status(200);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

export default (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET": return logout(req, res);
    default: return res.status(404).json({ message: "API route not found!" });
  }
}