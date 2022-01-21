import type { NextApiRequest, NextApiResponse } from "next";
import cloudinary from "cloudinary";

import Authorization from "../../../middleware/authorization";
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } from "../../../constants";

cloudinary.v2.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET
});

const upload = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await Authorization(req, false);
  
    const { base64EncodedImage } = req.body;
    if (!base64EncodedImage) return res.status(400).json({ message: "Image not found!" });

    console.log(base64EncodedImage)
    const { public_id, secure_url } = await cloudinary.v2.uploader.upload(base64EncodedImage, {
      folder: "e-commerce-website"
    });
    console.log(public_id, secure_url)

    return res.status(200).json({
      publicId: public_id,
      url: secure_url
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "POST": return upload(req, res);
    default: return res.status(404).json({ message: "API route not found!" });
  }
}

export default handler;