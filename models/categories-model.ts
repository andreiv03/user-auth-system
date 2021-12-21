import mongoose from "mongoose";

const schemaOptions = {
  timestamps: true
};

const categoriesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  parent: {
    type: String,
    trim: true,
    default: ""
  }
}, schemaOptions);

const Categories = mongoose.models.Categories || mongoose.model("Categories", categoriesSchema); 

export default Categories;