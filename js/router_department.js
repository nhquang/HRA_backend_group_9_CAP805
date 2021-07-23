const express = require('express');
const { query, validationResult } = require('express-validator');
const router = express.Router();
const DepartmentModel = require('../models/DepartmentModel');

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

router.get(''
    , query('branchId', 'must have branchId').notEmpty()
    , query('pageNum', 'must have pageNum').notEmpty()
    , query('pageSize', 'must have pageSize').notEmpty()
    , function (req, res) {

    let branchId = req.query.branchId;
    let pageNum = req.query.pageNum;
    let pageSize = req.query.pageSize;
    console.log([branchId, pageNum, pageSize]);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    DepartmentModel
        .find()
        .exec()
        .then((list)=>{
            res.json(list);
        })
        .catch((err) => { console.log("An error occurred: ${err}" + err) });
});

router.get('/:id', (req, res) => {
    DepartmentModel
        .findOne({_id: req.params.id})
        .exec()
        .then((data)=>{
            res.json(data);
        })
        .catch((err) => { console.log("An error occurred: ${err}" + err) });
});

router.post('/:id', (req, res) => {
    return res.send('POST');
});

router.put('/:id', (req, res) => {
    return res.send('PUT');
});

router.delete('/:id', (req, res) => {
    return res.send('DELETE');
});

module.exports = router