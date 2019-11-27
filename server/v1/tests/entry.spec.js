import Chai from "chai";
import chaiHttp from "chai-http";
import fs from 'fs';
import path from 'path';


import app from "../../app";
import Auth from '../helpers/authenticate';

const { expect } = Chai;
Chai.should();
Chai.use(chaiHttp);

const validTokens = {
    savedUser: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJvYmVydEBnbWFpbC5jb20iLCJpZCI6MSwiaWF0IjoxNTcyNjg4MzEwfQ.dNSwMfMy52oCz68W-ou3TPi88e6iy5s8kAwkzT4u0Pw',
    unsavedUser: Auth.generateToken('gakwererepacis@gmail.com', 1200),
    noEntryUser: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJvYmVydHJ0QGdtYWlsLmNvbSIsImlkIjoyLCJpYXQiOjE1NzI3NzIwOTB9.oZhkuh1fjUM-pEAKzxGskzbRPWLDES4LVOtXMLh9moI'
};

const invalidToken = 'yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJvYmVydEBnbWFpbC5jb20iLCJpZCI6MSwiaWF0IjoxNTcyNjg4MzEwfQ.dNSwMfMy52oCz68W-ou3TPi88e6iy5s8kAwkzT4u0Pw';

const entriesTester = [{
    title: "Corruption in Police officers 2",
    location: "Latitude and Longitude", // Lat Long coordinates
    images: ['uploads/home3.jpg', 'uploads/home3.jpg'],
    videos: ['uploads/home3.jpg', 'uploads/home3.jpg'],
    comment: "A police officer who is in charge of the traffic are getting money from bad drivers. Not in our country of course"
}, {
    title: "Corruption in Police officers 3",
    location: "Latitude and Longitude", // Lat Long coordinates
    images: ['uploads/home3.jpg', 'uploads/home3.jpg'],
    videos: ['uploads/home3.jpg', 'uploads/home3.jpg'],
    comment: "A police officer who is in charge of the traffic are getting money from bad drivers. Not in our country of course"
}, {
    title: "",
    location: "Lat", // Lat Long coordinates
    images: ['uploads/home3.jpg', 'uploads/home3.jpg'],
    videos: ['uploads/home3.jpg', 'uploads/home3.jpg'],
    comment: "A police officer who is in charge of the traffic are getting money from bad drivers. Not in our country of course"
}];

describe('Endpoint POST /api/v1/:type', () => {
    it("should create a new red-flag when user has an account",
        async() => {
            const res = await Chai.request(app)
                .post(`/api/v1/red-flags`)
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .set("Authorization", `Bearer ${validTokens.savedUser}`)
                .field('title', entriesTester[0].title)
                .field('location', entriesTester[0].location)
                .attach('images', fs.readFileSync(path.join(__dirname, '../../../uploads/andela.jpg')), 'andela.jpg')
                .attach('videos', fs.readFileSync(path.join(__dirname, '../../../uploads/vids.mp4')), 'vids.mp4')
                .field('comment', entriesTester[0].comment);
            expect(res.body.status).to.equal(201);
            expect(res.body.data).to.be.an('array').with.lengthOf(1);
        },
    );
    it("should create a new intervention when user has an account",
        async() => {
            const res = await Chai.request(app)
                .post(`/api/v1/interventions`)
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .set("Authorization", `Bearer ${validTokens.savedUser}`)
                .field('title', entriesTester[1].title)
                .field('location', entriesTester[1].location)
                .attach('images', fs.readFileSync(path.join(__dirname, '../../../uploads/andela.jpg')), 'andela.jpg')
                .attach('videos', fs.readFileSync(path.join(__dirname, '../../../uploads/vids.mp4')), 'vids.mp4')
                .field('comment', entriesTester[1].comment);
            expect(res.body.status).to.equal(201);
            expect(res.body.data).to.be.an('array').with.lengthOf(1);
        },
    );

    it("should not create a new red-flag when user has no account", done => {
        Chai.request(app).post(`/api/v1/red-flags`)
            .set("Authorization", `Bearer ${validTokens.unsavedUser}`)
            .set("Content-Type", 'application/x-www-form-urlencoded')
            .send(entriesTester[0])
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.have.property("error", "Sign up first please");
            });
        done();
    });
    it("should create a new red-flag when user has an account",
        async() => {
            const res = await Chai.request(app)
                .post(`/api/v1/red-flags`)
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .set("Authorization", `Bearer ${validTokens.savedUser}`)
                .field('title', entriesTester[2].title)
                .field('location', entriesTester[2].location)
                .attach('images', fs.readFileSync(path.join(__dirname, '../../../uploads/andela.jpg')), 'andela.jpg')
                .attach('videos', fs.readFileSync(path.join(__dirname, '../../../uploads/vids.mp4')), 'vids.mp4')
                .field('comment', entriesTester[2].comment);
            expect(res.body.status).to.equal(400);
            expect(res.body.error).to.be.a('string');
        },
    );
    it("should not create a new intervention when user has no account", done => {
        Chai.request(app).post(`/api/v1/interventions`)
            .set("Authorization", `Bearer ${validTokens.unsavedUser}`)
            .set("Content-Type", 'application/x-www-form-urlencoded')
            .send(entriesTester[1])
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.have.property("error", "Sign up first please");
            });
        done();
    });
    it("should not create an entry with no image or video",
        async() => {
            const res = await Chai.request(app)
                .post(`/api/v1/red-flags`)
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .set("Authorization", `Bearer ${validTokens.savedUser}`)
                .field('title', entriesTester[0].title)
                .field('location', entriesTester[0].location)
                .field('comment', entriesTester[0].comment);
            expect(res.body.status).to.equal(400);
            expect(res.body.error).to.be.a("string");
        },
    );
});
