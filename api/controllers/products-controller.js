const Products = require("../../models/products-model.js");
const Features = require("../helpers/products-features.js");

module.exports = {
  getProducts: async (req, res) => {
    try {
      const features = new Features(Products.find(), req.query).filtering().sorting().paginating();
      const products = await features.query;

      return res.json(products);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  createProduct: async (req, res) => {
    try {
      const { sku, name, description, price } = req.body;

      const product = await Products.findOne({ sku });
      if (product) return res.status(400).json({ message: "This product already exists." });

      const newProduct = new Products({
        sku,
        name: name.toLowerCase(),
        description,
        price
      });

      await newProduct.save();

      return res.json({ message: "The product has been created." });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  updateProduct: async (req, res) => {
    try {
      const { name, description, price } = req.body;

      await Products.findByIdAndUpdate(req.params.id, {
        name: name.toLowerCase(),
        description,
        price
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