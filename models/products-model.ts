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
    default: {
      publicId: "",
      url: ""
    }
  },
  sold: {
    type: Number,
    default: 0
  }
}, schemaOptions);

const ProductsModel = mongoose.models.Products || mongoose.model("Products", productsSchema);
export default ProductsModel;