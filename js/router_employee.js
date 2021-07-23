const express = require('express');
const router = express.Router();
const EmployeeModel = require('../models/EmployeeModel');

router.get('/', function (req, res) {
    EmployeeModel
        .find()
        .exec()
        .then((list)=>{
            res.json(list);
        })
        .catch((err) => { console.log("An error occurred: ${err}" + err) });
});

router.get('/active_employees', (req, res) => {
    EmployeeModel
    .find({stillEmployed: true})
    .exec()
    .then((list)=>{
        res.json(list);
    })
    .catch((err) => { console.log("An error occurred: ${err}" + err) });
});

router.get('/inactive_employees', (req, res) => {
    EmployeeModel
    .find({stillEmployed: false})
    .exec()
    .then((list)=>{
        res.json(list);
    })
    .catch((err) => { console.log("An error occurred: ${err}" + err) });
});

router.get('/:id', (req, res) => {
    EmployeeModel
        .findOne({_id: req.params.id})
        .exec()
        .then((data)=>{
            res.json(data);
        })
        .catch((err) => { console.log("An error occurred: ${err}" + err) });
});

router.post('/add_employee', (req, res) => {
    EmployeeModel.create(req.body).then((employee)=>{
        res.json(employee);
    }).catch((err)=>{
        res.status(400).json({ message: err });
    });
});

router.put('/update_employee/:id', (req, res) => {
    EmployeeModel.findOneAndUpdate({_id: req.params.id},
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

router.delete('/delete_employee/:id', (req, res) => {
    EmployeeModel.deleteOne({ _id: req.params.id },(err, member)=>{
        if (err) {
            res.status(400).json({ message: err });
        }
        else {
            res.json(req.params.id + " deleted!!!");
        }
    });
});

module.exports = router