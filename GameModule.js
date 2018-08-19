"use strict";

const Utility = require("./app/model/utility.js");

class Game {
  constructor() {
    this.randomizedPlayers = new Utility().randomizePlayers();
    this.emptyField = new Array(9).fill("");
  };

  gameField() {

  };

  currentPlayer() {

  };

  result() {

  };
};

module.exports = Game;