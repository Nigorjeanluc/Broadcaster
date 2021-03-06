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
    savedUser: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJvYmVydEBnbWFpbC5jb20iLCJpZCI6MSwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNTc0OTYzNTcwfQ.J0jknKd1A8H48SUFUWphDcliBHdaU0sJHsGJSPwuA5E',
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
            expect(res.body.data).to.be.an('object');
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
            expect(res.body.data).to.be.an('object');
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
    it("should not create a new red-flag when user has not provided a token", done => {
        Chai.request(app).post(`/api/v1/red-flags`)
            .set("Content-Type", 'application/x-www-form-urlencoded')
            .send(entriesTester[0])
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.have.property("error", "Please provide a token first");
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

describe('Endpoint GET /api/v1/:type', () => {
    it("should retrieve all red-flags posted by a user", done => {
        Chai.request(app).get(`/api/v1/red-flags`)
            .set("Authorization", `Bearer ${validTokens.savedUser}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property("data");
            });
        done();
    });

    it("should retrieve all interventions posted by a user", done => {
        Chai.request(app).get(`/api/v1/interventions`)
            .set("Authorization", `Bearer ${validTokens.savedUser}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property("data");
            });
        done();
    });

    it("should return 404 error if a user did not report a red-flag", done => {
        Chai.request(app).get(`/api/v1/red-flags`)
            .set("Authorization", `Bearer ${validTokens.noEntryUser}`)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.have.property("error", `No red-flag entries found`);
            });
        done();
    });

    it("should return 404 error if a user did not report an intervetnion", done => {
        Chai.request(app).get(`/api/v1/interventions`)
            .set("Authorization", `Bearer ${validTokens.noEntryUser}`)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.have.property("error", `No intervention entries found`);
            });
        done();
    });
});

describe('Endpoint GET /api/v1/:type/:id', () => {
    it("should retrieve entry with approrpiate type: red-flag", done => {
        Chai.request(app).get(`/api/v1/red-flags/1`)
            .set("Authorization", `Bearer ${validTokens.savedUser}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property("status");
                res.body.should.have.property("data");
            });
        done();
    });
    it("should retrieve entry with approrpiate type: intervention", done => {
        Chai.request(app).get(`/api/v1/interventions/2`)
            .set("Authorization", `Bearer ${validTokens.savedUser}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property("status");
                res.body.should.have.property("data");
            });
        done();
    });
    it("should not retrieve entry with inapprorpiate type: red-flag", done => {
        Chai.request(app).get(`/api/v1/red-flags/2`)
            .set("Authorization", `Bearer ${validTokens.savedUser}`)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.have.property("status");
                res.body.should.have.property("error", 'No red-flag entry with id: 2 found');
            });
        done();
    });
    it("should not retrieve entry with inapprorpiate type: intervention", done => {
        Chai.request(app).get(`/api/v1/interventions/1`)
            .set("Authorization", `Bearer ${validTokens.savedUser}`)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.have.property("status");
                res.body.should.have.property("error", 'No intervention entry with id: 1 found');
            });
        done();
    });
    it("should not retrieve unsaved red-flag entries", done => {
        Chai.request(app).get(`/api/v1/red-flags/1000`)
            .set("Authorization", `Bearer ${validTokens.savedUser}`)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.have.property("status");
                res.body.should.have.property("error", 'No red-flag entry with id: 1000 found');
            });
        done();
    });
    it("should not retrieve unsaved intervention entries", done => {
        Chai.request(app).get(`/api/v1/interventions/1000`)
            .set("Authorization", `Bearer ${validTokens.savedUser}`)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.have.property("status");
                res.body.should.have.property("error", 'No intervention entry with id: 1000 found');
            });
        done();
    });
    it("should not retrieve entry with inapprorpiate id", done => {
        Chai.request(app).get(`/api/v1/interventions/1fgsgsdgsdfgfdsgf`)
            .set("Authorization", `Bearer ${validTokens.savedUser}`)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.have.property("status");
                res.body.should.have.property("error", 'Endpoint not found');
            });
        done();
    });
    it("should not retrieve entry with invalid type", done => {
        Chai.request(app).get(`/api/v1/interves/1`)
            .set("Authorization", `Bearer ${validTokens.savedUser}`)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.have.property("status");
                res.body.should.have.property("error");
            });
        done();
    });
});



describe('Endpoint PATCH /api/v1/:type/location', () => {

    it("should let owner's entry location edit red-flag", done => {
        Chai.request(app)
            .patch("/api/v1/red-flags/1/location")
            .send({ location: 'Another Logn and Lat' })
            .set("Authorization", `Bearer ${validTokens.savedUser}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.should.have.property("data");
                done();
            });
    });

    it("should not let owner's entry edit location red-flag with invalid request", done => {
        Chai.request(app)
            .patch("/api/v1/red-flags/1/location")
            .send({ comment: 'Another Logn and Lat' })
            .set("Authorization", `Bearer ${validTokens.savedUser}`)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a("object");
                res.body.should.have.property("error");
                done();
            });
    });

    it("should not let other users edit red-flag's location", done => {
        Chai.request(app)
            .patch("/api/v1/red-flags/1/location")
            .send({ location: 'Another Logn and Lat' })
            .set("Authorization", `Bearer ${validTokens.noEntryUser}`)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.have.property("status");
                res.body.should.have.property("error", 'No red-flag entry with id: 1 found');
                done();
            });
    });

    it("should not edit red-flag's location with wrong id", done => {
        Chai.request(app)
            .patch("/api/v1/red-flags/1hghdfghd/location")
            .send({ location: 'Another Logn and Lat' })
            .set("Authorization", `Bearer ${validTokens.noEntryUser}`)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.have.property("status");
                res.body.should.have.property("error", 'Endpoint not found');
                done();
            });
    });

    it("should not let owner's entry location with status different from draft", done => {
        Chai.request(app)
            .patch("/api/v1/interventions/2/location")
            .send({ location: 'Another Logn and Lat' })
            .set("Authorization", `Bearer ${validTokens.savedUser}`)
            .end((err, res) => {
                res.should.have.status(403);
                res.body.should.have.property("status");
                res.body.should.have.property("error", 'You are not allowed to change this location');
                done();
            });
    });
});

describe('Endpoint PATCH /api/v1/:type/comment', () => {

    it("should let owner's entry comment edit red-flag", done => {
        Chai.request(app)
            .patch("/api/v1/red-flags/1/comment")
            .send({ comment: 'Another Comment' })
            .set("Authorization", `Bearer ${validTokens.savedUser}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.should.have.property("data");
                done();
            });
    });

    it("should not let owner's entry edit comment of red-flag", done => {
        Chai.request(app)
            .patch("/api/v1/red-flags/1/comment")
            .send({ location: 'Another Comment' })
            .set("Authorization", `Bearer ${validTokens.savedUser}`)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a("object");
                res.body.should.have.property("error");
                done();
            });
    });

    it("should not let other users edit red-flag's comment", done => {
        Chai.request(app)
            .patch("/api/v1/red-flags/1/comment")
            .send({ comment: 'Another Logn and Lat' })
            .set("Authorization", `Bearer ${validTokens.noEntryUser}`)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.have.property("status");
                res.body.should.have.property("error", 'No red-flag entry with id: 1 found');
                done();
            });
    });

    it("should not edit red-flag's comment with wrong id", done => {
        Chai.request(app)
            .patch("/api/v1/red-flags/1hghdfghd/comment")
            .send({ comment: 'Another Logn and Lat' })
            .set("Authorization", `Bearer ${validTokens.noEntryUser}`)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.have.property("status");
                res.body.should.have.property("error", 'Endpoint not found');
                done();
            });
    });

    it("should not let owner's entry comment with status different from draft", done => {
        Chai.request(app)
            .patch("/api/v1/interventions/2/comment")
            .send({ comment: 'Another Comment' })
            .set("Authorization", `Bearer ${validTokens.savedUser}`)
            .end((err, res) => {
                res.should.have.status(403);
                res.body.should.have.property("status");
                res.body.should.have.property("error", 'You are not allowed to change this comment');
                done();
            });
    });
});

describe('Endpoint PATCH /api/v1/:type/status', () => {

    it("should let only admin edit entry's status", done => {
        Chai.request(app)
            .patch("/api/v1/red-flags/1/status")
            .send({ status: 'Resolved' })
            .set("Authorization", `Bearer ${validTokens.savedUser}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.should.have.property("data");
                done();
            });
    });

    it("should not let admin edit status with invalid request", done => {
        Chai.request(app)
            .patch("/api/v1/red-flags/1/status")
            .send({ location: 'Another Comment' })
            .set("Authorization", `Bearer ${validTokens.savedUser}`)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a("object");
                res.body.should.have.property("error");
                done();
            });
    });

    it("should not let admin edit status with invalid url", done => {
        Chai.request(app)
            .patch("/api/v1/red-flags/1ghash/status")
            .send({ status: 'Resolved' })
            .set("Authorization", `Bearer ${validTokens.savedUser}`)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a("object");
                res.body.should.have.property("error");
                done();
            });
    });

    it("should not let simple user edit entry's status", done => {
        Chai.request(app)
            .patch("/api/v1/red-flags/1/status")
            .send({ status: 'Resolved' })
            .set("Authorization", `Bearer ${validTokens.noEntryUser}`)
            .end((err, res) => {
                res.should.have.status(403);
                res.body.should.be.a("object");
                res.body.should.have.property("error");
                done();
            });
    });

    it("should only let admin edit saved entry's status", done => {
        Chai.request(app)
            .patch("/api/v1/red-flags/145478/status")
            .send({ status: 'Resolved' })
            .set("Authorization", `Bearer ${validTokens.savedUser}`)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a("object");
                res.body.should.have.property("error");
                done();
            });
    });
});

describe('Endpoint DELETE /api/v1/:type/:id', () => {

    it("should delete owner's entry", done => {
        Chai.request(app)
            .delete("/api/v1/red-flags/1")
            .set("Authorization", `Bearer ${validTokens.savedUser}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property("status");
                res.body.should.have.property("message", `red-flag record has been deleted`);
            });
        done();
    });

    it("should not delete entry if user isn't owner", done => {
        Chai.request(app)
            .delete("/api/v1/red-flags/1")
            .set("Authorization", `Bearer ${validTokens.noEntryUser}`)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.have.property("status");
                res.body.should.have.property("error", 'No red-flag entry with id: 1 found');
                done();
            });
    });

    it("should not delete with invalid id", done => {
        Chai.request(app)
            .delete("/api/v1/red-flags/1000sdsddsa")
            .set("Authorization", `Bearer ${validTokens.savedUser}`)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.have.property("status");
                res.body.should.have.property("error", 'Endpoint not found');
                done();
            });
    });

    it("should not delete entry without a token", done => {
        Chai.request(app)
            .delete("/api/v1/interventions/2")
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.have.property("status");
                res.body.should.have.property("error", 'Please provide a token first');
                done();
            });
    });

    it("should not delete entry with an invalid token", done => {
        Chai.request(app)
            .delete("/api/v1/interventions/2")
            .set("Authorization", `Bearer ${invalidToken}`)
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.have.property("status");
                res.body.should.have.property("error", 'Auth failed');
                done();
            });
    });
});
