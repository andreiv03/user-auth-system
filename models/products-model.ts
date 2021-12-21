import mongoose from "mongoose";

const schemaOptions = {
  timestamps: true
};

const productsSchema = new mongoose.Schema({
  sku: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    trim: true,
    default: ""
  },
  image: {
    type: Object,
    required: true
  },
  sold: {
    type: Number,
    default: 0
  }
}, schemaOptions);

const Products = mongoose.models.Products || mongoose.model("Products", productsSchema);

export default Products;