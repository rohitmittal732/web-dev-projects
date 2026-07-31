const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        
        trim: true
    },

    volunteer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Volunteer",
        required: true
    },

    campaign: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Campaign"
    },

    assignedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        
    },

    deadline: {
        type: Date,
        
    },
    location:{
        type:String,
        trim: true
    },

    status: {
        type: String,
        enum: ["Pending", "In Progress", "Completed"],
        default: "Pending"
    },

    priority: {
        type: String,
        enum: ["Low", "Medium", "High"],
        default: "Medium"
    },

    hoursWorked: {
        type: Number,
        default: 0
    },

    completedAt: {
        type: Date
    }

}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);