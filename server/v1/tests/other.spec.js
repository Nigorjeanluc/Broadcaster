import Chai from "chai";
import chaiHttp from "chai-http";
import app from "../../app";

Chai.should();
Chai.use(chaiHttp);

describe('Endpoint /', () => {
    it("should welcome a users", done => {
        Chai.request(app)
            .get("/")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property("message", "Welcome to Broadcaster App");
                done();
            });
    });

    it("should not allow wrong urls", done => {
        Chai.request(app)
            .get("/anywrongurl/")
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.have.property("error", "Endpoint not found");
                done();
            });
    });
})