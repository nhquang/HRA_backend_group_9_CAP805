const mongoose = require("mongoose");


const Department = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    branchId: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: false
    },
    active: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model("Department", Department, "Departments");