const mongoose = require('mongoose');

const donorSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  phone: {
    type: String,
    trim: true,
    match: /^[0-9]{10}$/,  
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 1
  },
  email: {
    type: String,
    trim: true,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  campaign:{
    type: String,
    trim: true,
    required: false
  }
});

const Donor = mongoose.model("Donor", donorSchema);

module.exports = Donor;
