import type { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";
import formidable from "formidable";
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
    // await Authorization(req, true);
  
    // const file: formidable.File = await new Promise((resolve, reject) => {
    //   const formidableOptions = {
    //     allowEmptyFiles: false,
    //     maxFileSize: 1024 * 1024
    //   };

    //   const form = new formidable.IncomingForm(formidableOptions);
    //   form.parse(req, async (error, fields, files) => {
    //     if (error) reject(error);
    //     resolve(files.file as formidable.File);
    //   });
    // });

    // if (!file || !file.mimetype) return res.status(400).json({ message: "File not found!" });

    // const { data: { id: fileId } } = await drive.files.create({
    //   requestBody: {
    //     name: file.newFilename,
    //     mimeType: file.mimetype
    //   },
    //   media: {
    //     mimeType: file.mimetype,
    //     body: fs.createReadStream(file.filepath)
    //   }
    // });

    // if (!fileId) return res.status(400).json({ message: "Google Drive did not work properly!" });

    // await drive.permissions.create({
    //   fileId,
    //   requestBody: {
    //     role: "reader",
    //     type: "anyone"
    //   }
    // });

    // const { data } = await drive.files.get({
    //   fileId,
    //   fields: "webViewLink"
    // });

    // return res.status(200).json({
    //   fileId,
    //   url: data.webViewLink
    // });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "POST": return uploadHandler(req, res);
    default: return res.status(404).json({ message: "API route not found!" });
  }
}

export const config = {
  api: {
    bodyParser: false
  }
};

export default handler;