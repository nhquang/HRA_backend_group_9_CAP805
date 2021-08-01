const request = require("supertest");
const app = require("../app");
const mongoose = require('mongoose');
const EmployeeModel = require('../models/EmployeeModel');

const dotenv = require("dotenv");
dotenv.config();

const objId = new mongoose.Types.ObjectId().toString();


  
const testData1 = {
    payInfo: {
      frequency: 'Monthly',
      bankAccountNumber: '3575820421361437',
      firstPayDate: '2017/09/14',
      salary: 9000,
      grossAmount: 7200
    },
    _id: '60ce5175e9d6321134911947',
    deparmentId: '60ce5175e9d6321134911944',
    fname: 'Burty',
    lname: 'Speariett',
    gender: 'Male',
    role: 'employee',
    username: 'bspeariettft',
    password: 'jYShZg9FfEj',
    hireDate: '2017/08/14',
    email: 'bspeariettft@artisteer.com',
    streetAddress: '77328 Caliangt Lane',
    city: 'Picton',
    province: 'Ontario',
    country: 'Canada',
    phone: '573-589-7712',
    stillEmployed: true,
    activationCode: '#4af27c'
}
let token = "";

beforeAll(async () => {
    await mongoose.connect(
        process.env.DB_CONNECTION_STRING,
        {useNewUrlParser: true, useUnifiedTopology: true}
    );

    const response  = await request(app).post('/authenticate/login').send({
            username: process.env.admin_username,
            password: process.env.admin_password,
        });
    token = response.body.token;
});

afterAll(async () => {
    await EmployeeModel.deleteOne({_id: objId});
    await mongoose.connection.close();
});

describe("Test admin account being able to see info of another account", () => {
    test("Burty Speariett is the employee",  done => {

        request(app)
                    .get("/employees/60ce5175e9d6321134911947")
                    .set('Authorization', `Bearer ${token}`)
                    .then(response => {
                        console.log(response.statusCode);
                        console.log(response.body);
                        expect(response.statusCode).toBe(200);
                        expect(response.body).toEqual(testData1);
                        done();
                    });
    });
});

describe("Test to see if the server will produce the expected result for a non-existing employee", () => {
    test("500, Internal Server Error",  done => {

        request(app)
                    .get("/employees/111111111111111111")
                    .set('Authorization', `Bearer ${token}`)
                    .then(response => {
                        console.log(response.statusCode);
                        console.log(response.body);
                        expect(response.statusCode).toBe(500);
                        expect(response.body).toEqual({"message": "Internal Server Error!"});
                        done();
                    });
    });
});