import type { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

const logout = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    res.setHeader("Set-Cookie", cookie.serialize("refreshToken", "", {
      maxAge: -1,
      path: "/"
    }));

    return res.status(200).end();
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET": return logout(req, res);
    default: return res.status(404).json({ message: "API route not found!" });
  }
}

export default handler;