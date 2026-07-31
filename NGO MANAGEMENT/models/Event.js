const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  image:{
     type:String,
     trim:true,
     required:true
  },
  title: {
    type: String,
    required: true,
    trim: true   
  },
  date: {
    type: Date,
    required: true  
  },
  location: {
    type: String,
    required: true,
    trim: true   
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
