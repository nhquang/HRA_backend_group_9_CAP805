const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
const HTTP_PORT = process.env.PORT || 8080;

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
    app.use(function cors (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*")
        next();
    });
    app.use('/departments', require('./js/router_department'));
    app.use('/branches', require('./js/router_branch'));

    app.use((req, res, next) => {
        res.status(404).send("Not Found");
    });
    
    app.listen(HTTP_PORT, () => {
        console.log("Express http server listening on: " + HTTP_PORT);
    });
}).catch((err) => {
    console.log(err.message);
});