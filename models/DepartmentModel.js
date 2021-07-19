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
    }
});

module.exports = mongoose.model("Department", Department, "Departments");