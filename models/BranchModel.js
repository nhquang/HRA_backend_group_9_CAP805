const mongoose = require("mongoose")

const Branch = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    streetAddress: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    province: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model("Branch", Branch, "Branches");