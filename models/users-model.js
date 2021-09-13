import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
    trim: true
  },
  last_name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  phone_number: {
    type: String,
    trim: true
  },
  cart: {
    type: Array,
    default: []
  }
}, {
  timestamps: true
});

export default mongoose.model("Users", usersSchema);