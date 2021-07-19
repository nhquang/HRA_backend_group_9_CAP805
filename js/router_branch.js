const express = require('express');
const router = express.Router();
const Department = require('../models/BranchModel');

router.get("/", (req,res) => {
    Department
    .find()
    .exec()
    .then((data) => {
        res.json(data);
    })
    .catch((err)=>{
        console.log(`An error occurred: ${err}`);
    });
});

router.get("/:id", (req,res) =>{
    Department
    .findOne({_id: req.params.id})
    .exec()
    .then((data) => {
        res.json(data);
    })
    .catch(() => {
        console.log(`An error occurred: ${err}`);
    });
});

module.exports = router