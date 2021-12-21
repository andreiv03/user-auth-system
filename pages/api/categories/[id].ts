import { NextApiRequest, NextApiResponse } from "next";

import Authorization from "../../../middleware/authorization";
import Products from "../../../models/products-model";
import Categories from "../../../models/categories-model";
import connectDatabase from "../../../utils/database";

const updateCategory = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await Authorization(req, true);
    const { name, parent } = req.body;

    const category = await Categories.findById(req.query.id);
    if (!category) return res.status(400).json({ message: "Category not found!" });

    const duplicate = await Categories.findOne({ name });
    if (duplicate && parent === category.parent) return res.status(400).json({ message: "This category already exists!" });

    await Categories.findByIdAndUpdate(req.query.id, {
      name,
      parent
    });
    
    await Categories.updateMany({ parent: category.name }, {
      $set: {
        parent: name
      }
    });

    await Products.updateMany({ category: category.name }, {
      $set: {
        category: name
      }
    });

    return res.status(200).json({ message: "Category updated!" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

const deleteCategory = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await Authorization(req, true);

    const category = await Categories.findById(req.query.id);
    if (!category) return res.status(400).json({ message: "Category not found!" });

    const product = await Products.findOne({ category: category.name });
    if (product) return res.status(400).json({ message: "The category must not contain any products at the time of deletion!" });

    await Categories.findByIdAndDelete(req.query.id);

    return res.status(200).json({ message: "Category deleted!" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDatabase();

  switch (req.method) {
    case "PATCH": return updateCategory(req, res);
    case "DELETE": return deleteCategory(req, res);
    default: return res.status(404).json({ message: "API route not found!" });
  }
}