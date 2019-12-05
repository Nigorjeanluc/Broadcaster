import Chai from "chai";
import chaiHttp from "chai-http";
import fs from 'fs';
import path from 'path';

import app from "../../app";
import entryData from './mockData/entryData';
import authData from './mockData/authData';


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
const { validTokens, invalidToken, entriesTester } = entryData;

Chai.use(chaiHttp);

describe('Endpoint POST /api/v2/:type', () => {
    // Retrieves saved User test hook
    before(mochaAsync(async() => {
        const res = await Chai.request(app)
            .post("/api/v2/auth/signin")
            .send({ email: authData[0].email, password: authData[0].password });
        validTokens.savedUser = res.body.data.token;
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
            const res = await Chai.request(app).post(`/api/v2/red-flags`)
                .set("Authorization", `Bearer ${validTokens.unsavedUser}`)
                .set("Content-Type", 'application/x-www-form-urlencoded')
                .send(entriesTester[0]);
            expect(res.status).to.equal(401);
            expect(res.body).to.be.an('object');
            expect(res.body.error).to.be.a('string');

        }));
    it("should not create a new intervention when user has no account",
        mochaAsync(async() => {
            const res = await Chai.request(app).post(`/api/v2/interventions`)
                .set("Authorization", `Bearer ${validTokens.unsavedUser}`)
                .set("Content-Type", 'application/x-www-form-urlencoded')
                .send(entriesTester[1]);
            expect(res.status).to.equal(401);
            expect(res.body).to.be.an('object');
            expect(res.body.error).to.be.a('string');
        }));

    it("should create a new red-flag when user has an account",
        mochaAsync(async() => {
            const res = await Chai.request(app)
                .post(`/api/v2/red-flags`)
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .set("Authorization", `Bearer ${validTokens.savedUser}`)
                .field('title', entriesTester[2].title)
                .field('location', entriesTester[2].location)
                .attach('images', fs.readFileSync(path.join(__dirname, '../../../uploads/andela.jpg')), 'andela.jpg')
                .attach('videos', fs.readFileSync(path.join(__dirname, '../../../uploads/vids.mp4')), 'vids.mp4')
                .field('comment', entriesTester[2].comment);
            expect(res.status).to.equal(400);
            expect(res.body.error).to.be.a('string');
        })
    );
    it("should not create an entry with no image or video",
        mochaAsync(async() => {
            const res = await Chai.request(app)
                .post(`/api/v2/red-flags`)
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .set("Authorization", `Bearer ${validTokens.savedUser}`)
                .field('title', entriesTester[0].title)
                .field('location', entriesTester[0].location)
                .field('comment', entriesTester[0].comment);
            expect(res.status).to.equal(400);
            expect(res.body.error).to.be.a("string");
        })
    );
    it("should not create an entry with no image or video",
        mochaAsync(async() => {
            const res = await Chai.request(app)
                .post(`/api/v2/red-flags`)
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .set("Authorization", `Bearer ${validTokens.savedUser}`)
                .field('location', entriesTester[0].location)
                .attach('images', fs.readFileSync(path.join(__dirname, '../../../uploads/andela.jpg')), 'andela.jpg')
                .attach('videos', fs.readFileSync(path.join(__dirname, '../../../uploads/vids.mp4')), 'vids.mp4')
                .field('comment', entriesTester[0].comment);
            expect(res.status).to.equal(400);
            expect(res.body.error).to.be.a("string");
        })
    );
});

describe('Endpoint GET /api/v2/:type', () => {
    it("should retrieve all red-flags posted by a user",
        mochaAsync(async() => {
            const res = await Chai.request(app).get(`/api/v1/red-flags`)
                .set("Authorization", `Bearer ${validTokens.savedUser}`);
            expect(res.status).to.equals(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property('status');
            expect(res.body).to.have.property('data');
            expect(res.body.data).to.be.an('array');
            console.log(res.body.error);
        }));

    it("should retrieve all interventions posted by a user",
        mochaAsync(async() => {
            const res = await Chai.request(app).get(`/api/v1/interventions`)
                .set("Authorization", `Bearer ${validTokens.savedUser}`);
            console.log(res.body.error);
            console.log(validTokens.savedUser);
            expect(res.status).to.equals(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property('status');
            expect(res.body).to.have.property('data');
            expect(res.body.data).to.be.an('array');
        }));

    it("should return 404 error if a user did not report a red-flag",
        mochaAsync(async() => {
            const res = await Chai.request(app).get(`/api/v1/red-flags`)
                .set("Authorization", `Bearer ${validTokens.noEntryUser}`);
            expect(res.body.status).to.equal(404);
            expect(res.body).to.be.an('object');
            expect(res.body.error).to.be.a('string');
        }));

    it("should return 404 error if a user did not report an intervetnion",
        mochaAsync(async() => {
            const res = await Chai.request(app).get(`/api/v1/interventions`)
                .set("Authorization", `Bearer ${validTokens.noEntryUser}`);
            expect(res.body.status).to.equal(404);
            expect(res.body).to.be.an('object');
            expect(res.body.error).to.be.a('string');
        }));
});

describe('Endpoint GET /api/v2/:type/:id', () => {
    it("should retrieve entry with approrpiate type: red-flag",
        mochaAsync(async() => {
            const res = await Chai.request(app).get(`/api/v2/red-flags/1`);
            expect(res.status).to.equals(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property('status');
            expect(res.body).to.have.property('data');
            expect(res.body.data).to.be.an('object');
        }));
    it("should retrieve entry with approrpiate type: intervention",
        mochaAsync(async() => {
            const res = await Chai.request(app).get(`/api/v2/interventions/2`);
            expect(res.status).to.equals(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property('status');
            expect(res.body).to.have.property('data');
            expect(res.body.data).to.be.an('object');
        }));
    it("should not retrieve entry with inapprorpiate type: red-flag",
        mochaAsync(async() => {
            const res = await Chai.request(app).get(`/api/v2/red-flags/2`);
            expect(res.body.status).to.equal(404);
            expect(res.body).to.be.an('object');
            expect(res.body.error).to.be.a('string');
        }));
    it("should not retrieve entry with inapprorpiate type: intervention",
        mochaAsync(async() => {
            const res = await Chai.request(app).get(`/api/v2/interventions/1`);
            expect(res.body.status).to.equal(404);
            expect(res.body).to.be.an('object');
            expect(res.body.error).to.be.a('string');
        }));
    it("should not retrieve unsaved red-flag entries",
        mochaAsync(async() => {
            const res = await Chai.request(app).get(`/api/v2/red-flags/1000`);
            expect(res.body.status).to.equal(404);
            expect(res.body).to.be.an('object');
            expect(res.body.error).to.be.a('string');
        }));
    it("should not retrieve unsaved intervention entries",
        mochaAsync(async() => {
            const res = await Chai.request(app).get(`/api/v2/interventions/1000`);
            expect(res.body.status).to.equal(404);
            expect(res.body).to.be.an('object');
            expect(res.body.error).to.be.a('string');
        }));
    it("should not retrieve entry with inapprorpiate id",
        mochaAsync(async() => {
            const res = await Chai.request(app).get(`/api/v2/interventions/1fgsgsdgsdfgfdsgf`);
            expect(res.body.status).to.equal(404);
            expect(res.body).to.be.an('object');
            expect(res.body.error).to.be.a('string');
        }));
    it("should not retrieve entry with invalid type",
        mochaAsync(async() => {
            const res = await Chai.request(app).get(`/api/v2/interves/1`);
            expect(res.body.status).to.equal(404);
            expect(res.body).to.be.an('object');
            expect(res.body.error).to.be.a('string');
        }));
});

describe('Endpoint PATCH /api/v2/:type/location', () => {

    it("should let owner's entry location edit red-flag",
        mochaAsync(async() => {
            const res = await Chai.request(app)
                .patch("/api/v2/red-flags/1/location")
                .send({ location: 'Another Logn and Lat' })
                .set("Authorization", `Bearer ${validTokens.savedUser}`);
            expect(res.status).to.equals(201);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property('status');
            expect(res.body).to.have.property('data');
            expect(res.body.data).to.be.an('object');
        }));

    before(mochaAsync(async() => {
        const res = await Chai.request(app)
            .post("/api/v2/auth/signup")
            .send(authData[1]);
        validTokens.noEntryUser = res.body.data.token;
    }));

    it("should not let other users edit red-flag's location",
        mochaAsync(async() => {
            const res = await Chai.request(app)
                .patch("/api/v2/red-flags/1/location")
                .send({ location: 'Another Logn and Lat' })
                .set("Authorization", `Bearer ${validTokens.noEntryUser}`);
            expect(res.body.status).to.equal(404);
            expect(res.body).to.be.an('object');
            expect(res.body.error).to.be.a('string');
        }));

    it("should not edit red-flag's location with wrong id",
        mochaAsync(async() => {
            const res = await Chai.request(app)
                .patch("/api/v2/red-flags/1hghdfghd/location")
                .send({ location: 'Another Logn and Lat' })
                .set("Authorization", `Bearer ${validTokens.noEntryUser}`);
            expect(res.body.status).to.equal(404);
            expect(res.body).to.be.an('object');
            expect(res.body.error).to.be.a('string');
        }));

    it("should let owner's entry location edit intervention",
        mochaAsync(async() => {
            const res = await Chai.request(app)
                .patch("/api/v2/interventions/2/location")
                .send({ location: 'Another Logn and Lat' })
                .set("Authorization", `Bearer ${validTokens.savedUser}`);
            expect(res.status).to.equals(201);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property('status');
            expect(res.body).to.have.property('data');
            expect(res.body.data).to.be.an('object');
        }));

    it("should not let owner's entry edit location of red-flag with invalid request",
        mochaAsync(async() => {
            const res = await Chai.request(app)
                .patch("/api/v2/red-flags/1/location")
                .send({ comment: 'Another Comment' })
                .set("Authorization", `Bearer ${validTokens.savedUser}`);
            expect(res.status).to.equals(400);
            expect(res.body).to.be.an('object');
            expect(res.body.error).to.be.a('string');
        }));
});

describe('Endpoint PATCH /api/v2/:type/comment', () => {

    it("should let owner's entry comment edit red-flag",
        mochaAsync(async() => {
            const res = await Chai.request(app)
                .patch("/api/v2/red-flags/1/comment")
                .send({ comment: 'Another Comment' })
                .set("Authorization", `Bearer ${validTokens.savedUser}`);
            expect(res.status).to.equals(201);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property('status');
            expect(res.body).to.have.property('data');
            expect(res.body.data).to.be.an('object');
        }));

    it("should not let other users edit red-flag's comment",
        mochaAsync(async() => {
            const res = await Chai.request(app)
                .patch("/api/v2/red-flags/1/comment")
                .send({ comment: 'Another Logn and Lat' })
                .set("Authorization", `Bearer ${validTokens.noEntryUser}`);
            expect(res.body.status).to.equal(404);
            expect(res.body).to.be.an('object');
            expect(res.body.error).to.be.a('string');
        }));

    it("should not edit red-flag's comment with wrong id",
        mochaAsync(async() => {
            const res = await Chai.request(app)
                .patch("/api/v2/red-flags/1hghdfghd/comment")
                .send({ comment: 'Another Logn and Lat' })
                .set("Authorization", `Bearer ${validTokens.noEntryUser}`);
            expect(res.body.status).to.equal(404);
            expect(res.body).to.be.an('object');
            expect(res.body.error).to.be.a('string');
        }));

    it("should let owner's entry comment edit intervention",
        mochaAsync(async() => {
            const res = await Chai.request(app)
                .patch("/api/v2/interventions/2/comment")
                .send({ comment: 'Another Comment' })
                .set("Authorization", `Bearer ${validTokens.savedUser}`);
            expect(res.status).to.equals(201);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property('status');
            expect(res.body).to.have.property('data');
            expect(res.body.data).to.be.an('object');
        }));
    it("should not let owner's entry edit comment of red-flag with invalid request",
        mochaAsync(async() => {
            const res = await Chai.request(app)
                .patch("/api/v2/red-flags/1/comment")
                .send({ location: 'Another Comment' })
                .set("Authorization", `Bearer ${validTokens.savedUser}`);
            expect(res.status).to.equals(400);
            expect(res.body).to.be.an('object');
            expect(res.body.error).to.be.a('string');
        }));
});
