import request from "supertest";
import createServer from "../../src/server/createServer";

// Inspired by http://glebbahmutov.com/blog/how-to-correctly-unit-test-express-server/

describe("createServer", () => {
  let server;

  beforeEach((done) => {
    server = createServer({
      env: "production"
    }, () => {
      done();
    });
  });

  afterEach((done) => {
    server.close(done);
  });

  it("serves favicon.ico", (done) => {
    request(server)
      .get("/favicon.ico")
      .expect(200, done);
  });

  it("responds to /", (done) => {
    request(server)
      .get("/")
      .expect(200, done);
  });

  it("responds to /featured/upcoming", (done) => {
    request(server)
      .get("/")
      .expect(200, done);
  });

  it("responds with 404 to unexisting routes", (done) => {
    request(server)
      .get("/foo/bar")
      .expect(404, done);
  });

});
