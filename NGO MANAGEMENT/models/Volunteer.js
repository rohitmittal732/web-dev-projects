const mongoose = require('mongoose');



const volunteerSchema = new mongoose.Schema({
  fullname: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    trim: true,
    match: /^[0-9]{10}$/,
    required: true
  },
  age: {
    type: Number,
    min: 16,   
    required: true
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Non-binary"],
    required: true
  },
  city: {
    type: String,
    trim: true,
    required: true
  },
  skill: {
    type: String,
    
    required: true
  },
  availability: {
    type: String,
    
    required: true
  },
  motivation: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  isApproved:{
    type:Boolean,
    default:false
  },
  status:{
    type:String,
    enum:['Pending','Approved','Rejected'],
    default:'Pending'
  },
  user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false,
        unique: true
    },
});

const Volunteer = mongoose.model("Volunteer", volunteerSchema);

module.exports = Volunteer;
