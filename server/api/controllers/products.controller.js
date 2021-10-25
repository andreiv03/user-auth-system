const { Products } = require("../models");

module.exports = {
  getProducts: async (req, res) => {
    try {
      const products = await Products.find();
      if (!products) return res.status(400).json({ message: "No products were found!" });

      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  createProduct: async (req, res) => {
    try {
      const { sku, name, description, price, category, image } = req.body;

      const product = await Products.findOne({ sku });
      if (product) return res.status(400).json({ message: "This SKU has already been registered by another product." });

      await Products.create({
        sku,
        name,
        description,
        price,
        category,
        image: {}
      });

      return res.status(200).json({ message: "The product has been created." });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  updateProduct: async (req, res) => {
    try {
      
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
};