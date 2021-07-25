const User = require('../models/EmployeeModel');
const express = require('express');
const router = express.Router();
const dotenv = require("dotenv");

dotenv.config();

router.get('/',(req,res) =>{
    res.json({username: req.decoded.username});
});

router.put('/update_account', (req,res)=>{
    //TODO
    //
    //
});

module.exports = router;