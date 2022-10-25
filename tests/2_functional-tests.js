const chaiHttp = require("chai-http");
const chai = require("chai");
let assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  // #1
  test("Test GET /api/convert?input=10L", function (done) {
    chai
      .request(server)
      .get("/api/convert?input=10L")
      .end(function (err, res) {
        assert.equal(res.status, 200);
        const output = JSON.parse(res.text);
        assert.equal(output.initNum, 10);
        assert.equal(output.initUnit, "L");
        assert.approximately(output.returnNum, 2.64172, 0.0001);
        assert.equal(output.returnUnit, "gal");
        assert.equal(
          output.string,
          `10 liters converts to ${output.returnNum} gallons.`
        );
        done();
      });
  });
  // #2
  test("Test GET /api/convert?input=32g (invalid unit)", function (done) {
    chai
      .request(server)
      .get("/api/convert?input=32g")
      .end(function (err, res) {
        assert.equal(res.status, 200);
        const output = JSON.parse(res.text);
        assert.equal(output, "invalid unit");
        done();
      });
  });
  // #3
  test("Test GET /api/convert?input=3/7.2/4kg (invalid number)", function (done) {
    chai
      .request(server)
      .get("/api/convert?input=3/7.2/4kg")
      .end(function (err, res) {
        assert.equal(res.status, 200);
        const output = JSON.parse(res.text);
        assert.equal(output, "invalid number");
        done();
      });
  });
  // #4
  test("Test GET /api/convert?input=3/7.2/4kilomegagram (invalid number and unit)", function (done) {
    chai
      .request(server)
      .get("/api/convert?input=3/7.2/4kilomegagram")
      .end(function (err, res) {
        assert.equal(res.status, 200);
        const output = JSON.parse(res.text);
        assert.equal(output, "invalid number and unit");
        done();
      });
  });
  // #5
  test("Test GET /api/convert?input=kg (default to 1 unit)", function (done) {
    chai
      .request(server)
      .get("/api/convert?input=kg")
      .end(function (err, res) {
        assert.equal(res.status, 200);
        const output = JSON.parse(res.text);
        assert.equal(output.initNum, 1);
        assert.equal(output.initUnit, "kg");
        assert.approximately(output.returnNum, 2.20462, 0.0001);
        assert.equal(output.returnUnit, "lbs");
        assert.equal(
          output.string,
          `1 kilograms converts to ${output.returnNum} pounds.`
        );
        done();
      });
  });
});
