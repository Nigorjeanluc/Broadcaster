import Chai from "chai";
import chaiHttp from "chai-http";
import fs from 'fs';
import path from 'path';

import app from "../../app";
import entryData from './mockData/entryData';
import authData from './mockData/authData';
import User from '../models/userModel';
import Auth from '../helpers/authenticate';


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
const { validTokens, invalidToken, entriesTester } = entryData;

Chai.use(chaiHttp);

describe('Endpoint POST /api/v2/:type', () => {
    // Retrieves saved User test hook
    before(mochaAsync(async() => {
        const userExists = await User.emailExists(authData[0].email);
        const { email, id, isadmin } = userExists.rows[0];
        validTokens.savedUser = Auth.generateToken(email, id, isadmin);
    }));

    it("should create a new red-flag when user has an account",
        mochaAsync(async() => {
            const res = await Chai.request(app)
                .post(`/api/v2/red-flags`)
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .set("Authorization", `Bearer ${validTokens.savedUser}`)
                .field('title', entriesTester[0].title)
                .field('location', entriesTester[0].location)
                .attach('images', fs.readFileSync(path.join(__dirname, '../../../uploads/andela.jpg')), 'andela.jpg')
                .attach('videos', fs.readFileSync(path.join(__dirname, '../../../uploads/vids.mp4')), 'vids.mp4')
                .field('comment', entriesTester[0].comment);
            expect(res.status).to.equals(201);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property('status');
            expect(res.body).to.have.property('data');
            expect(res.body.data).to.be.an('array').with.lengthOf(1);
        })
    );
    it("should create a new intervention when user has an account",
        mochaAsync(async() => {
            const res = await Chai.request(app)
                .post(`/api/v2/interventions`)
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .set("Authorization", `Bearer ${validTokens.savedUser}`)
                .field('title', entriesTester[1].title)
                .field('location', entriesTester[1].location)
                .attach('images', fs.readFileSync(path.join(__dirname, '../../../uploads/andela.jpg')), 'andela.jpg')
                .attach('videos', fs.readFileSync(path.join(__dirname, '../../../uploads/vids.mp4')), 'vids.mp4')
                .field('comment', entriesTester[1].comment);
            expect(res.status).to.equals(201);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property('status');
            expect(res.body).to.have.property('data');
            expect(res.body.data).to.be.an('array').with.lengthOf(1);
        })
    );

    it("should not create a new red-flag when user has no account",
        mochaAsync(async() => {
            const res = Chai.request(app).post(`/api/v2/red-flags`)
                .set("Authorization", `Bearer ${validTokens.unsavedUser}`)
                .set("Content-Type", 'application/x-www-form-urlencoded')
                .send(entriesTester[0]);
            expect(res.body.status).to.equal(401);
            expect(res.body).to.be.an('object');
            expect(res.body.error).to.be.a('string');

        }));
    it("should not create a new intervention when user has no account",
        mochaAsync(async() => {
            const res = await Chai.request(app).post(`/api/v2/interventions`)
                .set("Authorization", `Bearer ${validTokens.unsavedUser}`)
                .set("Content-Type", 'application/x-www-form-urlencoded')
                .send(entriesTester[1]);
            expect(res.body.status).to.equal(401);
            expect(res.body).to.be.an('object');
            expect(res.body.error).to.be.a('string');
        }));
});
