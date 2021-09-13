import mongoose from "mongoose";

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
  sold: {
    type: Number,
    default: 0
  },
  image: {
    type: Object,
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model("Products", productsSchema);