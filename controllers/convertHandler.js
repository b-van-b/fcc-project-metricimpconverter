function ConvertHandler() {
  this.units = {
    gal: {
      long: "gallons",
      opposite: "l",
      ratio: 3.78541
    },
    l: {
      capital: "L",
      long: "liters",
      opposite: "gal",
    },
    mi: {
      long: "miles",
      opposite: "km",
      ratio: 1.60934
    },
    km: {
      long: "kilometers",
      opposite: "mi",
    },
    lbs: {
      long: "pounds",
      opposite: "kg",
      ratio: 0.453592
    },
    kg: {
      long: "kilograms",
      opposite: "lbs",
    },
  };
  this.units.l.ratio = 1/this.units.gal.ratio;
  this.units.km.ratio = 1/this.units.mi.ratio;
  this.units.kg.ratio = 1/this.units.lbs.ratio;
  this.units.L = this.units.l;

  this.getNum = function (input) {
    // get content before the unit
    let result = input.match(/^[\d./]+/);
    // default to 1 if no number given
    if (!result) return 1;
    result = result[0];
    // check for divisor(s)
    const divisor = result.indexOf("/");
    if (divisor > -1) {
      // reject multiple divisors
      if (result.indexOf("/", divisor + 1) > -1) return "invalid";
      // handle single divisor
      result =
        Number(result.slice(0, divisor)) / Number(result.slice(divisor + 1));
    }

    return Number(result);
  };

  this.getUnit = function (input) {
    let result = input.match(/[a-z]+$/i);
    // reject empty unit
    if (!result) return "invalid";
    result = result[0].toLowerCase();
    // check if unit exists
    if (!this.units[result]) return "invalid";
    // capitalize L for liters
    if (this.units[result].capital) {
      result = this.units[result].capital;
    }
    return result;
  };

  this.getReturnUnit = function (initUnit) {
    let result = this.units[initUnit].opposite;
    // capitalize L for liters
    if (this.units[result].capital) result = this.units[result].capital;

    return result;
  };

  this.spellOutUnit = function (unit) {
    let result = this.units[unit].long;

    return result;
  };

  this.convert = function (initNum, initUnit) {
    // const galToL = 3.78541;
    // const lbsToKg = 0.453592;
    // const miToKm = 1.60934;
    let result = initNum * this.units[initUnit].ratio;

    return result;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result = `${initNum} ${this.units[initUnit].long} converts to ${returnNum} ${this.units[returnUnit].long}.`;

    return result;
  };
}

module.exports = ConvertHandler;
