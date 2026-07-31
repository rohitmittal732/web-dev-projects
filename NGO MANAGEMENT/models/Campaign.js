const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  image:{
     type:String,
     trim:true,
     required:true
  },
  title: {
    type: String,
    trim: true,
    required: true
  },
  goal: {
    type: Number,
    required: true,
    min: 1
  },
  collected: {
    type: Number,
    default: 0,
    min: 0
  },
  description: {
    type: String,
    trim: true,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Campaign = mongoose.model("Campaign", campaignSchema);

module.exports = Campaign;
