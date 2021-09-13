import Products from "../../../models/products-model.js";
import Features from "./features.js";

export default {
  getProducts: async (req, res) => {
    try {
      const features = new Features(Products.find(), req.query).filtering().sorting().paginating();
      const products = await features.query;

      return res.json({
        status: "success",
        result: products.length,
        products
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  createProduct: async (req, res) => {
    try {
      const { sku, name, description, price, image } = req.body;

      if (!image) return res.status(400).json({ message: "You have not uploaded an image!" });

      const product = await Products.findOne({ sku });
      if (product) return res.status(400).json({ message: "This product already exists!" });

      const newProduct = new Products({
        sku,
        name: name.toLowerCase(),
        description,
        price,
        image
      });

      await newProduct.save();
      
      return res.json({ message: "The product has been created." });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  updateProduct: async (req, res) => {
    try {
      const { name, description, price, image } = req.body;
      if (!image) return res.status(400).json({ message: "You have not uploaded an image!" });

      await Products.findByIdAndUpdate(req.params.id, {
        name: name.toLowerCase(),
        description,
        price,
        image
      });

      return res.json({ message: "The product has been updated." });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      await Products.findByIdAndDelete(req.params.id);

      return res.json({ message: "The product has been deleted." });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}