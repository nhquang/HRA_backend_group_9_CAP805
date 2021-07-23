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
    , query('page', 'must have page').notEmpty()
    , async (req, res) => {

    const { page = 1, limit = 10 } = req.query;
    const branchId = req.query.branchId;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const list = await DepartmentModel
        .find({branchId: branchId})
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();

    const count = await DepartmentModel.countDocuments({branchId: branchId});

    res.json({
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        list,
    });
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

router.post('/:id', async (req, res) => {

    return res.send('POST');
});

router.put('/:id', async (req, res) => {
    return res.send('PUT');
});

router.delete('/:id', async (req, res) => {
    return res.send('DELETE');
});

module.exports = router