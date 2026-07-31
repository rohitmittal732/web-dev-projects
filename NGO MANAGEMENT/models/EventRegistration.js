const mongoose = require("mongoose");

const eventRegistrationSchema = new mongoose.Schema({

    volunteer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Volunteer",
        required: true
    },

    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required: true
    },

    registeredAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model(
    "EventRegistration",
    eventRegistrationSchema
);