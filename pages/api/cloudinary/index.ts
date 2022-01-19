import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";

import Authorization from "../../../middleware/authorization";

const uploadHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await Authorization(req, true);
  
    const file: formidable.File = await new Promise((resolve, reject) => {
      const formidableOptions = {
        allowEmptyFiles: false,
        maxFileSize: 1024 * 1024
      };

      const form = new formidable.IncomingForm(formidableOptions);
      form.parse(req, async (error, fields, files) => {
        if (error) reject(error);
        resolve(files.file as formidable.File);
      });
    });

    if (!file || !file.mimetype) return res.status(400).json({ message: "File not found!" });

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