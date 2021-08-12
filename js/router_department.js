const express = require('express');
const { query, body, validationResult } = require('express-validator');
const router = express.Router();
const DepartmentModel = require('../models/DepartmentModel');
const EmployeeModel = require('../models/EmployeeModel');
const BranchModel = require('../models/BranchModel');

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

router.get('/all'
    , query('branchId', 'must have branchId').notEmpty()
    , async (req, res) => {

        const branchId = req.query.branchId;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const list = await DepartmentModel
            .find({branchId: branchId})
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

    //name can not be exists in the same branch
    const sameNameDep = await DepartmentModel
        .findOne({branchId: req.body.branchId, name: req.body.name, active: true})
        .exec();
    if(sameNameDep!=null){
        return res.status(400).json({ message: "department name exists"});
    }

    DepartmentModel.create(req.body).then((data)=>{
        res.json(data);
    }).catch((err)=>{
        res.status(400).json({ message: err });
    });
});

router.put('', async (req, res) => {
    res.status(400).json({ message: "invalid parameters" });
});

router.put('/:id'
    , body('branchId', 'must have branchId').notEmpty()
    , body('name', 'must have name').notEmpty()
    , body('description', 'must have description').notEmpty()
    , async (req, res) => {

        if(req.decoded.role !== 'admin'){
            return res.status(400).json({ message: "permission deny" });
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "invalid parameters", errors: errors.array() });
        }

        //check branch exist
        const branch = await BranchModel.findOne({_id: req.body.branchId, active: true}).exec();
        if(branch==null){
            return res.status(400).json({ message: "branch not exists"});
        }

        //name can not be exists in the same branch
        const sameNameDep = await DepartmentModel
            .findOne({_id: {$ne: req.params.id}, branchId: req.body.branchId, name: req.body.name, active: true})
            .exec();
        if(sameNameDep!=null){
            return res.status(400).json({ message: "department name exists"});
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

router.post('/search'
    , body('branchId', 'must have branchId').notEmpty()
    , async (req, res) => {
    const branchId = req.body.branchId;
    const q = req.body.q;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const list = await DepartmentModel
        .find({branchId: branchId, name: { $regex: '.*' + q + '.*' } ,active: true})
        .exec();

    res.json(list);
});

module.exports = router