import Chai from "chai";
import chaiHttp from "chai-http";

import app from "../../app";
import usersTester from "./mockData/authData";

Chai.should();
Chai.use(chaiHttp);

describe('Endpoint /api/v2/auth/signup', () => {

    it("should create a new user account", done => {
        Chai.request(app)
            .post("/api/v2/auth/signup")
            .send(usersTester[0])
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.have.property("message", "User created successfully");
                res.body.should.be.a("object");
                done();
            });
    });

    it("should not create a new user if email exist", done => {
        Chai.request(app)
            .post("/api/v2/auth/signup")
            .send(usersTester[0])
            .end((err, res) => {
                res.should.have.status(409);
                res.body.should.have.property(
                    "error",
                    "Email already exists!"
                );
                done();
            });
    });

    it("should not create a new user if username exist", done => {
        Chai.request(app)
            .post("/api/v2/auth/signup")
            .send(usersTester[3])
            .end((err, res) => {
                res.should.have.status(409);
                res.body.should.have.property(
                    "error",
                    "Username already exists!"
                );
                done();
            });
    });

    it("should not create a new user if there is a validation error", done => {
        Chai.request(app)
            .post("/api/v2/auth/signup")
            .send(usersTester[2])
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property("error");
                done();
            });
    });
});
