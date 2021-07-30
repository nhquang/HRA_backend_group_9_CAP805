const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
//const EmployeeModel = require('./models/EmployeeModel');
const jwt = require('jsonwebtoken');
const HTTP_PORT = process.env.PORT || 8080;
var cors = require('cors')

dotenv.config();
mongoose.connect(
    process.env.DB_CONNECTION_STRING,
    {useNewUrlParser: true, useUnifiedTopology: true}
).then(() => {
    // // Sessions and Cookies for persistance
    // const clientSessions = require("client-sessions");
    // app.use(clientSessions({
    //     cookieName: "myCompanySession",
    //     secret: "cap805_group9",
    //     duration: 24 * 60 * 60 * 1000,
    //     activeDuration: 1000 * 60 * 5
    // }));

    // // Security for Role management
    // const ensureLogin = (req, res, next) => {
    //     if (!req.myCompanySession.id) {
    //         res.json({code: -1, msg: "session expired"});
    //     } else {
    //         next();
    //     }
    // }
    app.use(cors());
    // app.use(function cors (req, res, next) {
    //     res.header("Access-Control-Allow-Origin", "*")
    //     next();
    // });

    app.use(bodyParser.json());
    app.use('/register', require('./js/router_register'));
    app.use('/authenticate', require('./js/router_authentication'));
    app.use('/departments', require('./js/router_department'));
    app.use('/branches', require('./js/router_branch'));
    app.use('/employees', verify, require('./js/router_employee'));
    app.use('/account',verify, require('./js/router_account'));

    app.use((req, res, next) => {
        res.status(404).send("Not Found");
    });
    
    app.listen(HTTP_PORT, () => {
        console.log("Express http server listening on: " + HTTP_PORT);
    });
}).catch((err) => {
    console.log(err.message);
});

function verify(req,res,next){
    const token = req.headers['authorization'].substring(7);
    console.log(token);
    if (token) {
        jwt.verify(token, process.env.jwt_secret, function(err, decoded) {
            if (err) res.status(401).json({ message: "Invalid token!"});
            else{
                // EmployeeModel
                // .findOne({username: decoded.username})
                // .exec()
                // .then((data)=>{
                //     if(data){
                //         req.decoded = decoded;
                //         next();
                //     }
                //     else res.status(401).send({ message: "Invalid token!"});
                // })
                // .catch((err) => {
                //     console.log("An error occurred: ${err}" + err);
                //     res.status(500).json({
                //         message: "Internal Server Error!"
                //     });
                // });
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.status(401).json({message:"Invalid token!"});
    }
}