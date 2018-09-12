"use strict";

const Global = require("../../server.js");

class View {
  constructor(symbol, fieldId) {
    this.symbol = symbol;
    this.fieldId = fieldId;
  }

  updateField() {
    Global.io.emit("updateField", {
      symbol: this.symbol,
      fieldId: this.fieldId
    });
  }
};

module.exports = View;