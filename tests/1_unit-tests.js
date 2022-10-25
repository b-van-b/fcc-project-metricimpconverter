const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  // #1
  test("read whole numbers", function () {
    assert.equal(
      convertHandler.getNum("34km"),
      34,
      "getNum('34km') should return 34"
    );
  });
  // #2
  test("read decimal numbers", function () {
    assert.equal(
      convertHandler.getNum("7.8km"),
      7.8,
      "getNum('7.8km') should return 7.8"
    );
    assert.equal(
      convertHandler.getNum("3.14159km"),
      3.14159,
      "getNum('7.8km') should return 3.14159"
    );
  });
  // #3
  test("read fractional input", function () {
    assert.equal(
      convertHandler.getNum("10/5km"),
      2,
      "getNum('10/5km') should return 2"
    );
    assert.equal(
      convertHandler.getNum("5/10km"),
      0.5,
      "getNum('5/10km') should return 0.5"
    );
  });
  // #4
  test("read fractional input with a decimal", function () {
    assert.approximately(
      convertHandler.getNum("6.6/3km"),
      2.2,
      0.01,
      "getNum('6.6/3km') should return 2.2"
    );
    assert.equal(
      convertHandler.getNum("10/2.5km"),
      4,
      "getNum('10/2.5km') should return 4"
    );
    assert.equal(
      convertHandler.getNum("10.56/2.4km"),
      4.4,
      "getNum('10.56/2.4km') should return 2.4"
    );
  });
  // #5
  test("return error on double fraction", function () {
    assert.equal(
      convertHandler.getNum("3/4/5km"),
      "invalid",
      "getNum('3/4/5km') should return 'invalid'"
    );
  });
  // #6
  test("default to 1 if no number given", function () {
    assert.equal(
      convertHandler.getNum("km"),
      1,
      "getNum('km') should return 1"
    );
  });
  // #7
  test("read all valid units", function () {
    assert.equal(convertHandler.getUnit("km"),"km");
    assert.equal(convertHandler.getUnit("32mi"),"mi");
    assert.equal(convertHandler.getUnit("3/4GaL"),"gal");
    assert.equal(convertHandler.getUnit("5.45l"),"L");
    assert.equal(convertHandler.getUnit("27kg"),"kg");
    assert.equal(convertHandler.getUnit("769lBs"),"lbs");
  });
  // #8
  test("error on invalid units", function () {
    assert.equal(convertHandler.getUnit("kms"),"invalid");
    assert.equal(convertHandler.getUnit("32miles"),"invalid");
    assert.equal(convertHandler.getUnit("3/4gjir"),"invalid");
    assert.equal(convertHandler.getUnit("5.45"),"invalid");
    assert.equal(convertHandler.getUnit("27helahi"),"invalid");
    assert.equal(convertHandler.getUnit("769kl?"),"invalid");
  });
  // #9
  test("give correct output units", function () {
    assert.equal(convertHandler.getReturnUnit("km"),"mi");
    assert.equal(convertHandler.getReturnUnit("mi"),"km");
    assert.equal(convertHandler.getReturnUnit("gal"),"L");
    assert.equal(convertHandler.getReturnUnit("l"),"gal");
    assert.equal(convertHandler.getReturnUnit("L"),"gal");
    assert.equal(convertHandler.getReturnUnit("kg"),"lbs");
    assert.equal(convertHandler.getReturnUnit("lbs"),"kg");
  });
  // #10
  test("give correct output units", function () {
    assert.equal(convertHandler.spellOutUnit("km"),"kilometers");
    assert.equal(convertHandler.spellOutUnit("mi"),"miles");
    assert.equal(convertHandler.spellOutUnit("gal"),"gallons");
    assert.equal(convertHandler.spellOutUnit("l"),"liters");
    assert.equal(convertHandler.spellOutUnit("L"),"liters");
    assert.equal(convertHandler.spellOutUnit("kg"),"kilograms");
    assert.equal(convertHandler.spellOutUnit("lbs"),"pounds");
  });
  // #11
  test("convert units correctly", function () {
    assert.approximately(convertHandler.convert(5,"mi"),5*1.60934,0.001);
    assert.approximately(convertHandler.convert(14,"km"),14/1.60934,0.001);
    assert.approximately(convertHandler.convert(68,"gal"),68*3.78541,0.001);
    assert.approximately(convertHandler.convert(97,"l"),97/3.78541,0.001);
    assert.approximately(convertHandler.convert(33,"lbs"),33*0.453592,0.001);
    assert.approximately(convertHandler.convert(44,"kg"),44/0.453592,0.001);
  });
});
