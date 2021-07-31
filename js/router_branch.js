const express = require('express');
const router = express.Router();
const Branch = require('../models/BranchModel');
const Department = require('../models/DepartmentModel');

router.get("/", (req,res) => {
    Branch
    .find()
    .exec()
    .then((data) => {
        res.json(data);
    })
    .catch((err)=>{
        console.log(`An error occurred: ${err}`);
        res.status(500).json({message:"Internal Server Error!"});
    });
});

router.get('/active_branches', (req, res) => {
    Branch
    .find({active: true})
    .exec()
    .then((list)=>{
        res.json(list);
    })
    .catch((err) => {
        console.log("An error occurred: ${err}" + err);
        res.status(500).json({message:"Internal Server Error!"});
    });
});

router.get('/inactive_branches', (req, res) => {
    Branch
    .find({active: false})
    .exec()
    .then((list)=>{
        res.json(list);
    })
    .catch((err) => {
        console.log("An error occurred: ${err}" + err);
        res.status(500).json({message:"Internal Server Error!"});
    });
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
        res.status(500).json({message:"Internal Server Error!"});
    });
});

router.post('/add_branch', (req, res) => {
    if(req.decoded.role === 'admin'){
        req.body.active = true;
        Branch.create(req.body).then((branch)=>{
            res.json(branch);
        }).catch((err)=>{
            console.log("An error occurred: ${err}" + err);
            res.status(500).json({message: "Internal Server Error!"});
        });
    }
    else res.status(401).json({message:"Unauthorized access!"});
});

router.put('/update_branch/:id', (req, res) => {
    if(req.decoded.role === 'admin'){
        Branch.findOneAndUpdate({_id: req.params.id},
            req.body, {new: true},(err, data)=>{
                if (err) {
                    console.log("An error occurred: ${err}" + err);
                    res.status(500).json({message: "Internal Server Error!"});
                }
                else {
                    res.status(200).json(data);
                }
            }
        );
    }
    else res.status(401).json({message:"Unauthorized access!"});
});

router.delete('/delete_branch/:id', (req, res) => {
    if(req.decoded.role === 'admin'){
        Department.find({branchId: req.params.id, active: true})
        .exec()
        .then((list) => {
            if(list.length == 0){
                Branch.findOneAndUpdate(
                    {_id: req.params.id},
                    {
                        $set: {
                            active: false
                        }
                    },
                    (err, data)=>{
                        if (err) {
                            res.status(500).json({ message: "Internal Server Error!" });
                            console.log(err);
                        }
                        else {
                            res.status(200).json({message: "Deleted!"});
                        }
                });
            }
            else res.status(500).json({ message: "Branch still has active departments!" });
        })
        .catch((err) =>{
            res.status(500).json({ message: "Internal Server Error!" });
            console.log(err);
        });
    }
    else res.status(401).json({message:"Unauthorized access!"});
});

module.exports = router