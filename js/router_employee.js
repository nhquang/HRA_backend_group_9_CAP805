const express = require('express');
const router = express.Router();
const EmployeeModel = require('../models/EmployeeModel');

//a regular employee can only access his own info
//a hr_staff can only access employees' info, and his 
//hr_manager can access all employees and hr staff 's info
//admin can access all employees
router.get('/', function (req, res) {
    console.log(req.decoded);
    if(req.decoded.role === 'employee'){
        EmployeeModel
        .findOne({_id: req.decoded.id})
        .exec()
        .then((data)=>{
            res.json(data);
        })
        .catch((err) =>{
            console.log("An error occurred: ${err}" + err);
            res.status(500).json({message: "Internal Server Error!"});
        });
    }
    else if (req.decoded.role === 'hr_staff'){
        EmployeeModel
        .find({
            $or: [
              { role : "employee" },
              { _id :  req.decoded.id }
            ]
        })
        .exec()
        .then((list)=>{
            res.json(list);
        })
        .catch((err) => {
            console.log("An error occurred: ${err}" + err);
            res.status(500).json({message: "Internal Server Error!"});
        });
    }
    else if (req.decoded.role === 'hr_manager'){
        EmployeeModel
        .find({
            $or: [
              { role : "employee" },
              { role :  "hr_staff"},
              { _id :  req.decoded.id }
            ]
        })
        .exec()
        .then((list)=>{
            res.json(list);
        })
        .catch((err) => {
            console.log("An error occurred: ${err}" + err);
            res.status(500).json({message: "Internal Server Error!"});
        });
    }
    else {
        EmployeeModel
        .find()
        .exec()
        .then((list)=>{
            res.json(list);
        })
        .catch((err) => {
            console.log("An error occurred: ${err}" + err);
            res.status(500).json({message: "Internal Server Error!"});
        });
    }
});

router.get('/active_employees', (req, res) => {
    if(req.decoded.role === 'admin'){
        EmployeeModel
        .find({stillEmployed: true})
        .exec()
        .then((list)=>{
            res.json(list);
        })
        .catch((err) => {
            console.log("An error occurred: ${err}" + err);
            res.status(500).json({message: "Internal Server Error!"});
        });
    }
    else if (req.decoded.role === 'hr_manager'){
        EmployeeModel
        .find({
            $or: [
                { stillEmployed: true, role : "employee"},
                { stillEmployed: true, role :  "hr_staff"},
                { _id :  req.decoded.id }
            ]
        })
        .exec()
        .then((list)=>{
            res.json(list);
        })
        .catch((err) => {
            console.log("An error occurred: ${err}" + err);
            res.status(500).json({message: "Internal Server Error!"});
        });
    }
    else if (req.decoded.role === 'hr_staff'){
        EmployeeModel
        .find({
            $or: [
                { stillEmployed: true, role : "employee"},
                { _id :  req.decoded.id }
            ]
        })
        .exec()
        .then((list)=>{
            res.json(list);
        })
        .catch((err) => {
            console.log("An error occurred: ${err}" + err);
            res.status(500).json({message: "Internal Server Error!"});
        });
    }
    else {
        EmployeeModel
        .find({ _id :  req.decoded.id })
        .exec()
        .then((list)=>{
            res.json(list);
        })
        .catch((err) => {
            console.log("An error occurred: ${err}" + err);
            res.status(500).json({message: "Internal Server Error!"});
        });
    }
});

router.get('/inactive_employees', (req, res) => {
    if(req.decoded.role === 'admin'){
        EmployeeModel
        .find({stillEmployed: false})
        .exec()
        .then((list)=>{
            res.json(list);
        })
        .catch((err) => {
            console.log("An error occurred: ${err}" + err);
            res.status(500).json({message: "Internal Server Error!"});
        });
    }
    else if (req.decoded.role === 'hr_manager'){
        EmployeeModel
        .find({
            $or: [
                { stillEmployed: false, role : "employee"},
                { stillEmployed: false, role :  "hr_staff"}
            ]
        })
        .exec()
        .then((list)=>{
            res.json(list);
        })
        .catch((err) => {
            console.log("An error occurred: ${err}" + err);
            res.status(500).json({message: "Internal Server Error!"});
        });
    }
    else if (req.decoded.role === 'hr_staff'){
        EmployeeModel
        .find({
            $or: [
                { stillEmployed: false, role : "employee"}
            ]
        })
        .exec()
        .then((list)=>{
            res.json(list);
        })
        .catch((err) => {
            console.log("An error occurred: ${err}" + err);
            res.status(500).json({message: "Internal Server Error!"});
        });
    }
    else {
        res.status(401).json({
            message:"Unauthorized access!"
        });
    }
});

//any role can access their own info.
//An hr_staff can only access regular employees info.
//The hr_manager can access all except admin.
//The admin can access all. 
router.get('/:id', (req, res) => {
    EmployeeModel
    .findOne({_id: req.params.id})
    .exec()
    .then((data)=>{
        if(!data) res.json({});
        else if(data._id == req.decoded.id
            || req.decoded.role === "admin"
            || (req.decoded.role === "hr_staff" && data.role === "employee")
            || (req.decoded.role === "hr_manager" && data.role !== "admin")
        )
            res.json(data);
        else {
            res.status(401).json({
                message:"Unauthorized access!"
            })
        }
    })
    .catch((err) => {
        console.log("An error occurred: ${err}" + err);
        res.status(500).json({
            message: "Internal Server Error!"
        });
    });
});


//admin can add any type of employees.
//The hr_manager can add anyone except admin.
//hr_staff can only add employees.
router.post('/add_employee', (req, res) => {
    req.body.username = "";      // Akash: The username and password are supposed to be empty until the user registers with their own username and password. You should get get rid of username field on the add and update employee pages
    req.body.password = "";
    if(req.decoded.role === "admin"
       || (req.decoded.role === "hr_manager" && req.body.role !== "admin")
       || (req.decoded.role === "hr_staff" && req.body.role === "employee")
    ){
        EmployeeModel.create(req.body).then((employee)=>{
            res.json(employee);
        }).catch((err)=>{
            console.log("An error occurred: ${err}" + err);
            res.status(500).json({message: "Internal Server Error!"});
        });
    }
    else {
        res.status(401).json({
            message:"Unauthorized access!"
        });
    }
});

//same as add_employee
router.put('/update_employee/:id', (req, res) => {
    if(req.decoded.role === "admin"
       || (req.decoded.role === "hr_manager" && req.body.role !== "admin")
       || (req.decoded.role === "hr_staff" && req.body.role === "employee")
    )
    {
        EmployeeModel.findOneAndUpdate({_id: req.params.id},
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
    else{
        res.status(401).json({
            message:"Unauthorized access!"
        });
    }
});

router.delete('/delete_employee/:id', (req, res) => {
    // EmployeeModel.deleteOne({ _id: req.params.id },(err, member)=>{
    //     if (err) {
    //         res.status(400).json({ message: err });
    //     }
    //     else {
    //         res.json(req.params.id + " deleted!!!");
    //     }
    // });
    EmployeeModel
    .findOne({_id: req.params.id})
    .exec()
    .then((employee)=>{
        if(req.decoded.role === "admin"
            || (req.decoded.role === "hr_manager" && employee.role !== "admin")
            || (req.decoded.role === "hr_staff" && employee.role === "employee")
        )
        {
            EmployeeModel.findOneAndUpdate(
                {_id: req.params.id},
                {
                    $set: {
                        stillEmployed: false
                    }
                },
                (err, data)=>{
                    if (err) {
                        res.status(500).json({ message: "Internal Server Error!" });
                        console.log(err);
                    }
                    else {
                        res.status(200).json({message: "Succeeded!"});
                    }
            });
        }
        else{
            res.status(401).json({
                message:"Unauthorized access!"
            });
        }
    })
    .catch((err)=>{
        console.log("An error occurred: ${err}" + err);
        res.status(500).json({message: "Internal Server Error!"});
    })
});

module.exports = router