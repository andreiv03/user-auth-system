import { NextApiRequest, NextApiResponse } from "next";
import Authorization from "../../../middleware/authorization";

const updateCategory = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await Authorization(req, true);
    const { name, parent } = req.body;

    const { default: CategoriesModel } = await import("../../../models/categories-model");
    const category = await CategoriesModel.findById(req.query.id).select("name").lean();
    if (!category) return res.status(400).json({ message: "Category not found!" });

    const duplicate = await CategoriesModel.exists({ name: name.toLowerCase() });
    if (duplicate) return res.status(400).json({ message: "This category already exists!" });

    await CategoriesModel.findByIdAndUpdate(req.query.id, {
      name: name.toLowerCase(),
      parent
    });
    
    await CategoriesModel.updateMany({ parent: category.name }, {
      $set: {
        parent: name.toLowerCase()
      }
    });

    const { default: ProductsModel } = await import("../../../models/products-model");
    await ProductsModel.updateMany({ category: category.name }, {
      $set: {
        category: name.toLowerCase()
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

    const { default: CategoriesModel } = await import("../../../models/categories-model");
    const category = await CategoriesModel.findById(req.query.id).select("name").lean();
    if (!category) return res.status(400).json({ message: "Category not found!" });

    const { default: ProductsModel } = await import("../../../models/products-model");
    const product = await ProductsModel.exists({ category: category.name });
    if (product) return res.status(400).json({ message: "The category must not contain any products at the time of deletion!" });

    await CategoriesModel.findByIdAndDelete(req.query.id);

    return res.status(200).json({ message: "Category deleted!" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "PATCH": return updateCategory(req, res);
    case "DELETE": return deleteCategory(req, res);
    default: return res.status(404).json({ message: "API route not found!" });
  }
}

export default handler;