//Author Quang Nguyen   013039151

const app = require('../app');
const request = require('supertest');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();

var testRegisterData = null;
beforeAll(async () =>{
    testRegisterData = {username:"nhquang", password:"testing123", confirmPassword:"testing123", activationCode:"60fe147886a09823c4113294"};
    await mongoose.connect(
        process.env.DB_CONNECTION_STRING,
        {useNewUrlParser: true, useUnifiedTopology: true}
    );

});
afterAll(async() =>{
    await mongoose.connection.close();
});

describe("Test register", () =>{
    test("This test should receive an error response because it uses an existing username from an activated user", done =>{
        request(app)
        .post("/register")
        .send(testRegisterDataFail)
        .then(response => {
            console.log(response.body);
            expect(response.statusCode).toBe(400);
            done();
        });
    });
});