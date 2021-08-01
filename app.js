const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
const jwt = require('jsonwebtoken');
var cors = require('cors')

dotenv.config();

app.use(cors());

app.use(bodyParser.json());
app.use('/register', require('./js/router_register'));
app.use('/authenticate', require('./js/router_authentication'));
app.use('/departments', verify, require('./js/router_department'));
app.use('/branches', require('./js/router_branch'));
app.use('/employees', verify, require('./js/router_employee'));
app.use('/account',verify, require('./js/router_account'));

app.use((req, res, next) => {
    res.status(404).send("Not Found");
});

function verify(req,res,next){
    const token = req.headers['authorization'].substring(7);
    console.log(token);
    if (token) {
        jwt.verify(token, process.env.jwt_secret, function(err, decoded) {
            if (err) res.status(401).json({ message: "Invalid token!"});
            else{
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.status(401).json({
            message:"Unauthorized access!"
        });
    }
}

module.exports = app;