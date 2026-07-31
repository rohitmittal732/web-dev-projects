const mongoose = require('mongoose');


const donationSchema = new mongoose.Schema({
  donorName: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    trim: true,
    required: true
  },
  phone: {
    type: String,
    trim: true,
    required: true,
    match: /^[0-9]{10}$/   
  },
  campaign: {
    type: String,
    required: true,
   
  },
  amount: {
    type: Number,
    required: true,
    min: 1
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ["Credit/Debit Card", "Bank transfer", "PayPal", "Crypto Wallet"]
  },
  message: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Donation = mongoose.model("Donation", donationSchema);

module.exports = Donation;
