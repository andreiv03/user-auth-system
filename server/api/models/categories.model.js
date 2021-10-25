const mongoose = require("mongoose");

const categoriesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  parent: {
    type: String,
    trim: true,
    default: ""
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Categories", categoriesSchema);