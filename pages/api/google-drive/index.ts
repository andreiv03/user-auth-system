import { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";
import fs from "fs";

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

const uploadHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await Authorization(req, true);
    console.log(req.body);
    // const { file } = req.body;

    // const { data: createData } = await drive.files.create({
    //   requestBody: {
    //     name: file.name,
    //     mimeType: file.mimeType
    //   },
    //   media: {
    //     mimeType: file.mimeType,
    //     body: fs.createReadStream(file.tempFilePath)
    //   }
    // });

    // await drive.permissions.create({
    //   fileId: createData.id,
    //   requestBody: {
    //     role: "reader",
    //     type: "anyone"
    //   }
    // });

    // const { data: getData } = await drive.files.get({
    //   fileId: createData.id,
    //   fields: "webViewLink"
    // });

    // await path.deleteFilePath(file.tempFilePath);

    // return res.status(200).json({
    //   fileId: createData.id,
    //   url: getData.webViewLink
    // });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

const deleteHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await Authorization(req, true);

    const { fileId } = req.body;
    await drive.files.delete({ fileId });
    
    return res.status(200).json({ message: "Image deleted!" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "POST": return uploadHandler(req, res);
    case "DELETE": return deleteHandler(req, res);
    default: return res.status(404).json({ message: "API route not found!" });
  }
}