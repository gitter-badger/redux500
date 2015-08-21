import request from "supertest";
import createServer from "../../src/server/createServer";

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

});
