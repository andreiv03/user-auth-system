import { NextApiRequest, NextApiResponse } from "next";
import Authorization from "../../../middleware/authorization";

const getProducts = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { default: ProductsModel } = await import("../../../models/products-model");
    const products = await ProductsModel.find().select("sku name description price category image").lean();
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
    
    const { default: ProductsModel } = await import("../../../models/products-model");
    const product = await ProductsModel.exists({ sku: sku.toLowerCase() });
    if (product) return res.status(400).json({ message: "The SKU must be unique!" });

    await ProductsModel.create({
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

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET": return getProducts(req, res);
    case "POST": return createProduct(req, res);
    default: return res.status(404).json({ message: "API route not found!" });
  }
}

export default handler;