const express = require('express');
const router = express.Router();
const Branch = require('../models/BranchModel');

router.get("/", (req,res) => {
    Branch
    .find()
    .exec()
    .then((data) => {
        res.json(data);
    })
    .catch((err)=>{
        console.log(`An error occurred: ${err}`);
    });
});

router.get('/active_branches', (req, res) => {
    Branch
    .find({active: true})
    .exec()
    .then((list)=>{
        res.json(list);
    })
    .catch((err) => { console.log("An error occurred: ${err}" + err) });
});

router.get('/inactive_branches', (req, res) => {
    Branch
    .find({active: false})
    .exec()
    .then((list)=>{
        res.json(list);
    })
    .catch((err) => { console.log("An error occurred: ${err}" + err) });
});

router.get("/:id", (req,res) =>{
    Branch
    .findOne({_id: req.params.id})
    .exec()
    .then((data) => {
        res.json(data);
    })
    .catch(() => {
        console.log(`An error occurred: ${err}`);
    });
});

router.put('/update_branch/:id', (req, res) => {
    Branch.findOneAndUpdate({_id: req.params.id},
        req.body, {new: true},(err, data)=>{
            if (err) {
                res.status(400).json({ message: err });
            }
            else {
                res.status(200).json(data);
            }
        }
    );
});

router.delete('/delete_branch/:id', (req, res) => {
    Branch.deleteOne({ _id: req.params.id },(err, member)=>{
        if (err) {
            res.status(400).json({ message: err });
        }
        else {
            res.json(req.params.id + " deleted!!!");
        }
    });
});

module.exports = router