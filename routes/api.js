"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.route("/api/convert").get((req, res) => {
    const input = req.query.input;
    const output = {
      initNum: convertHandler.getNum(input),
      initUnit: convertHandler.getUnit(input),
    };
    // check for invalid input
    if (output.initNum=="invalid") return res.text("invalid number");
    if (output.initUnit=="invalid") return res.text("invalid unit");

    output.returnNum = convertHandler.convert(output.initNum, output.initUnit);
    output.returnUnit = convertHandler.getReturnUnit(output.initUnit);
    output.string = convertHandler.getString(
      output.initNum,
      output.initUnit,
      output.returnNum,
      output.returnUnit
    );

    res.json(output);
    
  });
};
