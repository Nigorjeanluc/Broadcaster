import Chai from "chai";
import chaiHttp from "chai-http";
import app from "../../app";

Chai.should();
Chai.use(chaiHttp);

const usersTester = [{
    firstname: 'Jean-Luc',
    lastname: 'Ndiramiye',
    email: 'nigorjeanluc@gmail.com',
    phoneNumber: '0789660036',
    username: 'KingJay',
    password: '1234567890'
}, {
    firstname: 'Robert',
    lastname: 'Ndiramiye',
    email: 'robert@gmail.com',
    phoneNumber: '0789660037',
    username: 'KingRob',
    password: '123456789'
}, {
    firstname: 'Robert',
    email: 'cynthia@gmail.com',
    phoneNumber: '0789660036',
    username: 'QueenCycy',
    password: '123456789999'
}];



describe('Endpoint /api/v1/auth/signup', () => {

    it("should create a new user account", done => {
        Chai.request(app)
            .post("/api/v1/auth/signup")
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
            .post("/api/v1/auth/signup")
            .send(usersTester[1])
            .end((err, res) => {
                res.should.have.status(409);
                res.body.should.have.property(
                    "error",
                    "The email already exists"
                );
                done();
            });
    });

    it("should not create a new user if there is a validation error", done => {
        Chai.request(app)
            .post("/api/v1/auth/signup")
            .send(usersTester[2])
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property("error");
                done();
            });
    });
});

describe('Endpoint /api/v1/auth/signin', () => {
    it("should signin a user with an account", done => {
        Chai.request(app)
            .post("/api/v1/auth/signin")
            .send({ email: usersTester[1].email, password: usersTester[1].password })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property("data");
                res.body.data.should.have.property("token");
                res.body.should.have.property(
                    "message",
                    "User is successfully logged in"
                );
                done();
            });
    });

    it("should not signin a user who don't have an account", done => {
        Chai.request(app)
            .post("/api/v1/auth/signin")
            .send({ email: usersTester[2].email, password: usersTester[2].password })
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.have.property(
                    "error",
                    "Auth failed"
                );
                done();
            });
    });

    it("should not signin a user if authentication failed", done => {
        Chai.request(app)
            .post("/api/v1/auth/signin")
            .send({ email: usersTester[2].email, password: usersTester[2].password })
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.have.property("error", "Auth failed");
                done();
            });
    });

    it("should not signin a user with wrong password", done => {
        Chai.request(app)
            .post("/api/v1/auth/signin")
            .send({ email: usersTester[1].email, password: usersTester[2].password })
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.have.property("error", "Wrong password");
                done();
            });
    });

    it("should not signin a user if there is a validation error", done => {
        Chai.request(app)
            .post("/api/v1/auth/signin")
            .send({ email: 'cynthiagmail.com', password: usersTester[2].password })
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property("error");
                done();
            });
    });

});