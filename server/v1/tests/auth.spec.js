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