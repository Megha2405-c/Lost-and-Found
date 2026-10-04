const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },

    itemName: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    date: {
        type: String,
        required: true
    },

    contact: {
        type: String,
        required: true
    },

    status: {
        type: String,
        default: "Active"
    }
});

module.exports = mongoose.model("Item", itemSchema);