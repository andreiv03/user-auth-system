const { Products, Categories } = require("../models");

module.exports = {
  getCategories: async (req, res) => {
    try {
      const categories = await Categories.find();
      if (!categories) return res.status(400).json({ message: "No categories were found!" });

      return res.status(200).json(categories);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  createCategory: async (req, res) => {
    try {
      const { name, parent } = req.body;

      const category = await Categories.findOne({ name });
      if (category) return res.status(400).json({ message: "This category already exists!" });
    
      await Categories.create({
        name,
        parent
      });

      return res.status(200).json({ message: "The category has been created." });
    } catch (error) {
      return res.status(500).json({ message: error.message });      
    }
  },
  updateCategory: async (req, res) => {
    try {
      const { name, parent } = req.body;

      const category = await Categories.findById(req.params.id);
      if (!category) return res.status(400).json({ message: "The category does not exist." });

      const currentCategory = await Categories.findOne({ name });
      if (currentCategory) return res.status(400).json({ message: "This category already exists." }); // conditia in caz ca actualizeaza doar parent-ul

      await Categories.updateMany({ parent: category.name }, {
        $set: {
          parent: name
        }
      });

      await Categories.findByIdAndUpdate(req.params.id, {
        name,
        parent
      });

      return res.status(200).json({ message: "The category has been updated." });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const category = await Categories.findById(req.params.id);
      if (!category) return res.status(400).json({ message: "The category does not exist." });

      const product = await Products.findOne({ category: category.name });
      if (product) return res.status(400).json({ message: "The category must not contain any products at the time of deletion!" });

      await Categories.findByIdAndDelete(req.params.id);

      return res.status(200).json({ message: "The category has been deleted." });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
};