import Chai from "chai";
import chaiHttp from "chai-http";

import app from "../../app";
import usersTester from "./mockData/authData";

const mochaAsync = (fn) => {
    return async() => {
        try {
            await fn();
        } catch (err) {
            console.log(err.message);
        }
    };
};

const { expect } = Chai;
Chai.use(chaiHttp);

describe('Endpoint /api/v2/auth/signup', () => {

    it("should create a new user account",
        mochaAsync(async() => {
            const res = await Chai.request(app)
                .post("/api/v2/auth/signup")
                .send(usersTester[0]);
            expect(res.body.status).to.equal(201);
            expect(res.body).to.be.an('object');
            expect(res.body.message).to.be.a('string');
        }));

    it("should create a new user account with no entry",
        mochaAsync(async() => {
            const res = await Chai.request(app)
                .post("/api/v2/auth/signup")
                .send(usersTester[3]);
            expect(res.body.status).to.equal(201);
            expect(res.body).to.be.an('object');
            expect(res.body.message).to.be.a('string');
        }));

    it("should not create a new user if email exist",
        mochaAsync(async() => {
            const res = await Chai.request(app)
                .post("/api/v2/auth/signup")
                .send(usersTester[0]);
            expect(res.body.status).to.equal(409);
            expect(res.body).to.be.an('object');
            expect(res.body.error).to.be.a('string');
        }));

    it("should not create a new user if username exist",
        mochaAsync(async() => {
            const res = await Chai.request(app)
                .post("/api/v2/auth/signup")
                .send(usersTester[3]);
            expect(res.body.status).to.equal(409);
            expect(res.body).to.be.an('object');
            expect(res.body.error).to.be.a('string');
        }));

    it("should not create a new user if there is a validation error",
        mochaAsync(async() => {
            const res = await Chai.request(app)
                .post("/api/v2/auth/signup")
                .send(usersTester[2]);
            expect(res.body.status).to.equal(400);
            expect(res.body).to.be.an('object');
            expect(res.body.error).to.be.a('string');
        }));
});

describe('Endpoint /api/v2/auth/signin', () => {
    it("should signin a user with an account",
        mochaAsync(async() => {
            const res = await Chai.request(app)
                .post("/api/v2/auth/signin")
                .send({ email: usersTester[0].email, password: usersTester[0].password });

            expect(res.body.status).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body.data).to.be.an('object');
            expect(res.body.data.token).to.be.a('string');
        }));

    it("should not signin a user who don't have an account",
        mochaAsync(async() => {
            const res = await Chai.request(app)
                .post("/api/v2/auth/signin")
                .send({ email: usersTester[2].email, password: usersTester[2].password });
            expect(res.body.status).to.equal(401);
            expect(res.body).to.be.an('object');
            expect(res.body.error).to.be.a('string');
        }));

    it("should not signin a user if authentication failed",
        mochaAsync(async() => {
            const res = await Chai.request(app)
                .post("/api/v2/auth/signin")
                .send({ email: usersTester[2].email, password: usersTester[2].password });

            expect(res.body.status).to.equal(401);
            expect(res.body).to.be.an('object');
            expect(res.body.error).to.be.a('string');
        }));

    it("should not signin a user with wrong password",
        mochaAsync(async() => {
            const res = await Chai.request(app)
                .post("/api/v2/auth/signin")
                .send({ email: usersTester[1].email, password: usersTester[2].password });

            expect(res.body.status).to.equal(401);
            expect(res.body).to.be.an('object');
            expect(res.body.error).to.be.a('string');
        }));

    it("should not signin a user if there is a validation error",
        mochaAsync(async() => {
            const res = await Chai.request(app)
                .post("/api/v2/auth/signin")
                .send({ email: 'cynthiagmail.com', password: usersTester[2].password });

            expect(res.body.status).to.equal(400);
            expect(res.body).to.be.an('object');
            expect(res.body.error).to.be.a('string');
        }));
});
