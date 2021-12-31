import mongoose from "mongoose";

const schemaOptions = {
  timestamps: true
};

const usersSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
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
  phoneNumber: {
    type: String,
    trim: true,
    default: ""
  },
  cart: {
    type: Array,
    default: []
  }
}, schemaOptions);

const UsersModel = mongoose.models.Users || mongoose.model("Users", usersSchema);
export default UsersModel;