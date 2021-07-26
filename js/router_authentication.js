const jwt = require('jsonwebtoken');
const User = require('../models/EmployeeModel');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const dotenv = require("dotenv");

dotenv.config();
router.post('/login',(req,res)=>{
    if (req.body.username && req.body.password){
        User.findOne({username: req.body.username}).lean().exec((err, user)=>{
            if(err)
                res.status(500).json({message: "Internal server error"});
            else if(!user)
                res.json({message:'Failed!'});
            else {
                bcrypt.compare(req.body.password, user.password, function(err, result) {
                    if(result){
                        const payload = {
                            username: user.username,
                            role: user.role
                        }
                        const token = jwt.sign(payload, process.env.jwt_secret, {
                            expiresIn: '4h' 
                        });
                        res.json({message: "Succeeded!", token: token});
                    }
                    else if(err) res.status(500).json({message:"Internal Server Error!"});
                    else res.json({message:'Failed!'});
                });
                
            }
        })
    }
    else {
        res.json({message:'Failed!'});
    }
    
})

module.exports = router;