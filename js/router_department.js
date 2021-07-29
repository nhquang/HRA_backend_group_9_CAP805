const express = require('express');
const { query, validationResult } = require('express-validator');
const router = express.Router();
const DepartmentModel = require('../models/DepartmentModel');
const EmployeeModel = require('../models/EmployeeModel');


// anyone can access departments, but for adding and updating, only admin can do those things
// you can get the role from req.decoded.role

router.get(''
    , query('branchId', 'must have branchId').notEmpty()
    , async (req, res) => {

    const branchId = req.query.branchId;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const list = await DepartmentModel
        .find({branchId: branchId, active: true})
        .exec();

    res.json(list);
});

router.get('/:id', async (req, res) => {
    DepartmentModel
        .findOne({_id: req.params.id})
        .exec()
        .then((data)=>{
            res.json(data);
        })
        .catch((err) => { console.log("An error occurred: ${err}" + err) });
});

router.post('', async (req, res) => {
    if(req.decoded.role !== 'admin'){
        res.status(400).json({ message: "permission deny" });
        return
    }

    DepartmentModel.create(req.body).then((data)=>{
        res.json(data);
    }).catch((err)=>{
        res.status(400).json({ message: err });
    });
});

router.put('/:id', async (req, res) => {
    if(req.decoded.role !== 'admin'){
        res.status(400).json({ message: "permission deny" });
        return
    }

    DepartmentModel.findOneAndUpdate({_id: req.params.id},
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

router.delete('/:id', async (req, res) => {
    if(req.decoded.role !== 'admin'){
        res.status(400).json({ message: "permission deny" });
        return
    }

    //only can delete departments with no employee
    console.log("delete_department");
    const departmentId = req.params.id;
    const list  = await EmployeeModel
        .find({deparmentId: departmentId, stillEmployed: true})
        .exec();
    if(list.length!=0){
        return res.status(400).json({ message: "can not delete departments with employee" });
    }
    DepartmentModel.findOneAndUpdate({_id: departmentId},
        {active: false}, null,(err, data)=>{
            if (err) {
                res.status(400).json({ message: err });
            }
            else {
                res.status(200).json(data);
            }
        }
    );
});

module.exports = router