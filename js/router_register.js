const express = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const router = express.Router();
const EmployeeModel = require('../models/EmployeeModel');

router.post(''
    , body('username').notEmpty().custom(value => {
        return EmployeeModel.findOne({username: value}).then(user => {
            if(!user){
                return Promise.reject('user not exists');
            }else if (user.password) {
                return Promise.reject('user already registered');
            }
        });
    }).bail()
    , body('password', ).isLength({ min: 6 })
    , body('confirmPassword', ).custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Password confirmation does not match password');
        }
        // Indicates the success of this synchronous custom validator
        return true;
    })
    , body('activationCode', 'must have activationCode').notEmpty().custom((value, { req }) => {
        return EmployeeModel.findOne({username: req.body.username}).then(user => {
            if (user._id!=value) {
                return Promise.reject('activation code not match');
            }
        });
    })
    , async (req, res) => {

        const password = req.body.password;
        const activationCode = req.body.activationCode; //activation code is the id

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        bcrypt.hash(password, 10, function(err, hash) {
            EmployeeModel.findOneAndUpdate({_id: activationCode},
                {password: hash}, null,(err, data)=>{
                    if (err) {
                        res.status(400).json({ message: err });
                    }else {
                        res.status(200).json({ message: "registration success" });
                    }
                }
            );
        });
});

router.get('/test_password', function (req, res) {
    EmployeeModel.findOne({username: "test1"}).then(user => {
        bcrypt.compare("123456", user.password, function(err, result) {
            res.status(200).json(result);
        });
    });
});

module.exports = router