import type { NextApiRequest, NextApiResponse } from "next";
import cloudinary from "cloudinary";

import Authorization from "../../../middleware/authorization";
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } from "../../../constants";

cloudinary.v2.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET
});

const deleteHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await Authorization(req, false);
  
    const { publicId } = req.body;
    if (!publicId) return res.status(400).json({ message: "Public ID not found!" });

    await cloudinary.v2.uploader.destroy(publicId);

    return res.status(200).json({ message: "Image deleted!" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "POST": return deleteHandler(req, res);
    default: return res.status(404).json({ message: "API route not found!" });
  }
}

export default handler;