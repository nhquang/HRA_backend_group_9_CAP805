const mongoose = require("mongoose");
const { stringify } = require("querystring");
const Schema = mongoose.Schema;

mongoose.Promise = require("bluebird");

const Department = new Schema ({
    "branchId": String,
    "description": String,
    "name": String
});

module.exports = mongoose.model("Departments", Department, "Departments");