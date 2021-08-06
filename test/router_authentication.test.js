//Author Quang Nguyen   013039151

const app = require('../app');
const request = require('supertest');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();

var testCredentialsPass = null;
var testCredentialsFail = null;
beforeAll(async () =>{
    testCredentialsPass = {username: "nhquang", password: "testing123"};
    testCredentialsFail = {username: "random", password:"testing123"};
    await mongoose.connect(
        process.env.DB_CONNECTION_STRING,
        {useNewUrlParser: true, useUnifiedTopology: true}
    );

});
afterAll(async() =>{
    await mongoose.connection.close();
});


describe("Test login", () =>{
    test("This test should successfully authenticate the user and receives a response with a token", done =>{
        request(app)
        .post("/authenticate/login")
        .send(testCredentialsPass)
        .then(response => {
            //console.log(response);
            expect(response.statusCode).toBe(200);
            expect(response.body.message).toEqual("Succeeded!");
            done();
        });
    });
});
describe("Test login", () =>{
    test("This test should fail to authenticate the user and receives a response with error", done =>{
        request(app)
        .post("/authenticate/login")
        .send(testCredentialsFail)
        .then(response => {
            //console.log(response);
            expect(response.statusCode).toBe(200);
            expect(response.body.message).toEqual("Failed!");
            done();
        });
    });
});