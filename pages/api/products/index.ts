import { NextApiRequest, NextApiResponse } from "next";

import Authorization from "../../../middleware/authorization";
import Products from "../../../models/products-model";
import connectDatabase from "../../../utils/database";

const getProducts = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const products = await Products.find().select("sku name description price category image").lean();
    if (!products) return res.status(400).json({ message: "No products were found!" });

    return res.status(200).json(products);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

const createProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await Authorization(req, true);
    const { sku, name, description, price, category, image } = req.body;

    const product = await Products.exists({ sku: sku.toLowerCase() });
    if (product) return res.status(400).json({ message: "The SKU must be unique!" });

    await Products.create({
      sku: sku.toLowerCase(),
      name,
      description,
      price,
      category,
      image
    });

    return res.status(200).json({ message: "Product created!" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDatabase();
  
  switch (req.method) {
    case "GET": return getProducts(req, res);
    case "POST": return createProduct(req, res);
    default: return res.status(404).json({ message: "API route not found!" });
  }
}

export default handler;