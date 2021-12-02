const request = require("supertest");
const chai = require("chai");
const expect = chai.expect;
const app = require("../app");
let should = chai.should();

describe("Gets all annonces", () => {
  // Tests
  it("Returns all annonces", done => {
    request(app)
      .post("/api")
      .send({
        query: "{ annonces {_id name description price createdAt type status} }"
      })
      .expect(200)
      .end((err, res) => {
        res.status.should.be.equal(200);
        res.body.data.posts.should.be.a("array");
        //res.body.data.posts.should.have.property("id");
        done();
      });
  });
});

describe("Gets a user's annonces", () => {
  // Tests
  it("Return all annonces of a user", done => {
    request(app)
      .post("/api")
      .send({
        query:
          '{ userAnnonces(user: "5de42357ebd41a415029da31") {_id name description price createdAt type status} }'
      })
      .expect(200)
      .end((err, res) => {
        res.status.should.be.equal(200);
        res.body.data.userAnnonces.should.be.a("array");
        //res.body.data.posts.should.have.property("id");
        done();
      });
  });
});

describe("Create annonce (not agent or admin)", () => {
  // Tests
  it("Returns an error message", done => {
    request(app)
      .post("/api")
      .send({
        mutation:
          '{createAnnonce(annonceInput: {name:"should work", description: " i hope this works ", price: 500, type: "Location"})}'
      })
      .expect(200)
      .end((err, res) => {
        res.status.should.be.equal(400);
        expect(res.body).to.have.nested.property("errors[0].message");
        done();
      });
  });
});

describe("Review an annonce", () => {
  // Tests
  it("Returns an authentification error message", done => {
    request(app)
      .post("/api")
      .send({
        mutation:
          '{ review(annonceID: "5de44ffe36d19042cc2af445", rating: 5, text: "it is a beautiful house")}'
      })
      .expect(200)
      .end((err, res) => {
        res.status.should.be.equal(400);
        expect(res.body).to.have.nested.property("errors[0].message");
        done();
      });
  });
});

describe("Like an annonce", () => {
  // Tests
  it("Returns an authentification error message", done => {
    request(app)
      .post("/api")
      .send({
        mutation:
          '{ annonce(annonceID: "5de44ffe36d19042cc2af445", likes["5de42357ebd41a415029da31"])}'
      })
      .expect(200)
      .end((err, res) => {
        res.status.should.be.equal(400);
        expect(res.body).to.have.nested.property("errors[0].message");
        done();
      });
  });
});


describe("Comment on an annonce", () => {
  // Tests
  it("Returns an authentification error message", done => {
    request(app)
      .post("/api")
      .send({
        mutation:
          '{comment(annonceID: "5de44ffe36d19042cc2af445", comments: ["nice annonce"])}'
      })
      .expect(200)
      .end((err, res) => {
        res.status.should.be.equal(400);
        expect(res.body).to.have.nested.property("errors[0].message");
        done();
      });
  });
});

describe("Message annonce owner", () => {
  // Tests
  it("Returns an authentification error message", done => {
    request(app)
      .post("/api")
      .send({
        mutation:
          '{ comment(annonceID: "5de44ffe36d19042cc2af445", messages: ["is it available ?"])}'
      })
      .expect(200)
      .end((err, res) => {
        res.status.should.be.equal(400);
        expect(res.body).to.have.nested.property("errors[0].message");
        done();
      });
  });
});

describe("Reply to a message", () => {
  // Tests
  it("Returns an authentification error message", done => {
    request(app)
      .post("/api")
      .send({
        mutation:
          '{ message(annonceID: "5de44ffe36d19042cc2af445", messageID: "5de4f12f17efd90e8c039ae8", : text: "message received")}'
      })
      .expect(200)
      .end((err, res) => {
        res.status.should.be.equal(400);
        expect(res.body).to.have.nested.property("errors[0].message");
        done();
      });
  });
});
