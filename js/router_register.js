const express = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const router = express.Router();
const EmployeeModel = require('../models/EmployeeModel');

router.post(''

    , body('activationCode', 'must have activationCode').notEmpty().bail()
        .custom((value, { req }) => {
            return EmployeeModel.findOne({_id: value}).then(user => {
                if (!user) {
                    return Promise.reject('activation code not exists');
                }
            });
        })
    , body('username').notEmpty().bail().custom((value, { req }) => {
        return EmployeeModel.findOne({_id: {$ne: req.body.activationCode}, username: value}).then(user => {
            if(user){
                return Promise.reject('username exists, please choose another username');
            }
        });
    })
    , body('password', ).isLength({ min: 6 })
    , body('confirmPassword', ).custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Password confirmation does not match password');
        }
        // Indicates the success of this synchronous custom validator
        return true;
    })
    , async (req, res) => {

        const username = req.body.username;
        const password = req.body.password;
        const activationCode = req.body.activationCode; //activation code is the id

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        bcrypt.hash(password, 10, function(err, hash) {
            EmployeeModel.findOneAndUpdate({_id: activationCode},
                {username: username, password: hash}, null,(err, data)=>{
                    if (err) {
                        res.status(400).json({ message: err });
                    }else {
                        res.status(200).json({ message: "registration success" });
                    }
                }
            );
        });
    });

module.exports = router