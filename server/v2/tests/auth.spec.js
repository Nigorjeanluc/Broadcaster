import Chai from "chai";
import chaiHttp from "chai-http";

import app from "../../app";
import usersTester from "./mockData/authData";

const mochaAsync = (fn) => {
    return async() => {
        try {
            await fn();
        } catch (err) {
            console.error(err);
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
