var express = require("express");
var app = express();
var HTTP_PORT = process.env.PORT || 8080;

function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
}

// database connections
const config = require("./js/config");
const mongoose = require("mongoose");
mongoose.connect(config.dbconn, {useNewUrlParser: true, useUnifiedTopology: true});

// Sessions and Cookies for persistance
const clientSessions = require("client-sessions");
app.use(clientSessions({
    cookieName: "myCompanySession",
    secret: "cap805_group9",
    duration: 24 * 60 * 60 * 1000,
    activeDuration: 1000 * 60 * 5
}));

// Security for Role management
function ensureLogin(req, res, next) {
    if (!req.myCompanySession.id) {
        res.json({code: -1, msg: "session expired"});
    } else {
        next();
    }
}

app.use('/department', require('./js/router_department'));
app.use('/branch', require('./js/router_branch'));

// Start Express Server
app.listen(HTTP_PORT, onHttpStart);