"use strict";

const Utility = require("./app/model/utility.js");

class Game {
  constructor() {
    this.players = new Utility().randomPlayerFigure();
    this.field = new Array(9).fill("");
  };

  gameField() {

  };

  currentPlayer() {

  };

  result() {

  };
};

module.exports = Game;