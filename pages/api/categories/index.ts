import { NextApiRequest, NextApiResponse } from "next";

import Authorization from "../../../middleware/authorization";
import Categories from "../../../models/categories-model";
import connectDatabase from "../../../utils/database";

const getCategories = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const categories = await Categories.find().select("name parent").lean();
    if (!categories) return res.status(400).json({ message: "No categories were found!" });

    return res.status(200).json(categories);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

const createCategory = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await Authorization(req, true);
    const { name, parent } = req.body;

    const category = await Categories.exists({ name: name.toLowerCase() });
    if (category) return res.status(400).json({ message: "This category already exists!" });
  
    await Categories.create({
      name: name.toLowerCase(),
      parent
    });

    return res.status(200).json({ message: "Category created!" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDatabase();

  switch (req.method) {
    case "GET": return getCategories(req, res);
    case "POST": return createCategory(req, res);
    default: return res.status(404).json({ message: "API route not found!" });
  }
}

export default handler;