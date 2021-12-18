const fs = require("fs");
const { google } = require("googleapis");

const { GOOGLE_DRIVE_CLIENT_ID, GOOGLE_DRIVE_CLIENT_SECRET, GOOGLE_DRIVE_REDIRECT_URI, GOOGLE_DRIVE_REFRESH_TOKEN } = require("../../constants");
const { path } = require("../helpers");

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

module.exports = {
  upload: async (req, res) => {
    try {
      const { file } = req.files;

      const { data: createData } = await drive.files.create({
        requestBody: {
          name: file.name,
          mimeType: file.mimeType
        },
        media: {
          mimeType: file.mimeType,
          body: fs.createReadStream(file.tempFilePath)
        }
      });

      await drive.permissions.create({
        fileId: createData.id,
        requestBody: {
          role: "reader",
          type: "anyone"
        }
      });

      const { data: getData } = await drive.files.get({
        fileId: createData.id,
        fields: "webViewLink"
      });

      await path.deleteFilePath(file.tempFilePath);

      return res.status(200).json({
        fileId: createData.id,
        url: getData.webViewLink
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  delete: async (req, res) => {
    try {
      const { fileId } = req.body;
      await drive.files.delete({ fileId });
      
      return res.status(200).json({ message: "The image has been deleted." });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
};