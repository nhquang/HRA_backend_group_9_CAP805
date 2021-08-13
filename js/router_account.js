const EmployeeModel = require('../models/EmployeeModel');
const express = require('express');
const router = express.Router();
const dotenv = require("dotenv");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

dotenv.config();

router.get('/',(req,res) =>{
    res.json({username: req.decoded.username});
});

router.post('/update_account'
    , body('username').notEmpty().bail().custom((value, { req }) => {
        if(value!=req.decoded.username){
            return EmployeeModel.findOne({username: value}).then(user => {
                if(user){
                    return Promise.reject('username exists, please choose another username');
                }
            });
        }
        return true;
    })
    , body('password', ).isLength({ min: 6 })
    , body('confirmPassword', ).custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Password confirmation does not match password');
        }
        // Indicates the success of this synchronous custom validator
        return true;
    })
    , (req,res)=>{

    const oldUserName = req.decoded.username;
    const username = req.body.username;
    const password = req.body.password;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: "invalid parameters", errors: errors.array() });
    }

    bcrypt.hash(password, 10, function(err, hash) {
        EmployeeModel.findOneAndUpdate({username: oldUserName},
            {username: username, password: hash}, null,(err, data)=>{
                if (err) {
                    res.status(400).json({ message: err });
                }else {
                    res.status(200).json({ message: "update account success" });
                }
            }
        );
    });
});

module.exports = router;