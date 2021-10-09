const mongoose = require("mongoose");

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
  cart: {
    type: Array,
    default: []
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Users", usersSchema);