var express = require("express");
var app = express();

var HTTP_PORT = process.env.PORT || 8080;


app.get("/", (req,res) => {
    res.json({message: "Hello World!!!"});
});



app.listen(HTTP_PORT, onHttpStart);

function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
}
  