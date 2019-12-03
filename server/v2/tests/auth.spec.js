import Chai from "chai";
import chaiHttp from "chai-http";

import app from "../../app";
import usersTester from "./mockData/authData";

const { expect } = Chai;
Chai.use(chaiHttp);

describe('Endpoint /api/v2/auth/signup', () => {

    it("should create a new user account",
        async() => {
            const res = await Chai.request(app)
                .post("/api/v2/auth/signup")
                .send(usersTester[0]);
            expect(res.body.status).to.equal(201);
            expect(res.body).to.be.an('object');
            expect(res.body.message).to.be.a('string');
        });

    it("should not create a new user if email exist",
        async() => {
            const res = await Chai.request(app)
                .post("/api/v2/auth/signup")
                .send(usersTester[0]);
            expect(res.body.status).to.equal(409);
            expect(res.body).to.be.an('object');
            expect(res.body.error).to.be.a('string');
        });

    it("should not create a new user if username exist",
        async() => {
            const res = await Chai.request(app)
                .post("/api/v2/auth/signup")
                .send(usersTester[3]);
            expect(res.body.status).to.equal(409);
            expect(res.body).to.be.an('object');
            expect(res.body.error).to.be.a('string');
        });

    it("should not create a new user if there is a validation error",
        async() => {
            const res = await Chai.request(app)
                .post("/api/v2/auth/signup")
                .send(usersTester[2]);
            expect(res.body.status).to.equal(400);
            expect(res.body).to.be.an('object');
            expect(res.body.error).to.be.a('string');
        });
});
