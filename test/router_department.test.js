
const request = require("supertest");
const app = require("../app");
const mongoose = require('mongoose');
const DepartmentModel = require('../models/DepartmentModel');

const dotenv = require("dotenv");
dotenv.config();

const objId = new mongoose.Types.ObjectId().toString();
const testData = {
    "_id": objId,
    "branchId": "60ce287cad08cf5b0d94732a",
    "description": "test department",
    "name": "test department",
    "active": true,
    "__v": 0
}

beforeAll(async () => {
    await mongoose.connect(
        process.env.DB_CONNECTION_STRING,
        {useNewUrlParser: true, useUnifiedTopology: true}
    );
});

afterAll(async () => {
    await DepartmentModel.deleteOne({_id: objId});
    await mongoose.connection.close();
});

describe("Test add department", () => {
    test("It should add a department in the db",  done => {
        request(app)
            .post("/departments")
            .send(testData)
            .then(response => {
                expect(response.statusCode).toBe(200);
                //check data
                request(app)
                    .get("/departments/"+objId)
                    .then(response => {
                        expect(response.statusCode).toBe(200);
                        expect(response.body).toEqual(testData);
                        done();
                    });
            });
    });
});

describe("Test delete department", () => {
    test("It should delete a department in the db",   done => {
        request(app)
            .delete("/departments/"+objId)
            .then(response => {
                expect(response.statusCode).toBe(200);
                //check data
                testData.active = false;
                request(app)
                    .get("/departments/"+objId)
                    .then(response => {
                        expect(response.statusCode).toBe(200);
                        expect(response.body).toEqual(testData);
                        done();
                    });
            });
    });
});