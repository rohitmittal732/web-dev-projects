const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    trim: true,
    required: true
  },

  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    unique: true
  },

  phone: {
    type: String,
    trim: true,
    match: /^[0-9]{10}$/
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ["admin", "volunteer", "donor"],
    required: true
  },

  rememberMe: {
    type: Boolean,
    default: false
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("User", userSchema);