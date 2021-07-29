
const mongoose = require("mongoose");
const app = require("./app");
const dotenv = require("dotenv");
const HTTP_PORT = process.env.PORT || 8080;

dotenv.config();

mongoose.connect(
    process.env.DB_CONNECTION_STRING,
    {useNewUrlParser: true, useUnifiedTopology: true}
).then(() => {
    app.listen(HTTP_PORT, () => {
        console.log("Express http server listening on: " + HTTP_PORT);
    });
}).catch((err) => {
    console.log(err.message);
});