const mongoose = require("mongoose")

const Employee = mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname:{
        type: String,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    role:{
        type: String,
        required: true
    },
    username: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: false
    },
    hireDate: {
        type: String,
        required: true
    },
    email: {
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
    phone: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    payInfo: {
        frequency: {
            type: String,
            required: true
        },
        bankAccountNumber: {
            type: String,
            required: true
        },
        firstPayDate: {
            type: String,
            required: true
        },
        salary : {
            type: Number,
            required: true
        },
        grossAmount: {
            type: Number,
            required: true
        }
    },
    stillEmployed: {
        type: Boolean,
        required: true
    },
    note:{
        type: String,
        required: false
    },
    deparmentId: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Employee", Employee, "Employees");