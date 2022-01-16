import type { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";

import Authorization from "../../../middleware/authorization";
import { GOOGLE_DRIVE_CLIENT_ID, GOOGLE_DRIVE_CLIENT_SECRET, GOOGLE_DRIVE_REFRESH_TOKEN } from "../../../constants";

const GOOGLE_DRIVE_REDIRECT_URI = "https://developers.google.com/oauthplayground";
const oauth2Client = new google.auth.OAuth2(
  GOOGLE_DRIVE_CLIENT_ID,
  GOOGLE_DRIVE_CLIENT_SECRET,
  GOOGLE_DRIVE_REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: GOOGLE_DRIVE_REFRESH_TOKEN });

const drive = google.drive({
  version: "v3",
  auth: oauth2Client
});

const deleteHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await Authorization(req, true);
    drive.files.delete({ fileId: req.query.id as string });
    return res.status(200).json({ message: "Image deleted!" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "DELETE": return deleteHandler(req, res);
    default: return res.status(404).json({ message: "API route not found!" });
  }
}

export default handler;