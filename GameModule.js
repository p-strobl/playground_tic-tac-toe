"use strict";

const Utility = require("./app/model/utility.js");
const Message = require("./app/model/message.js");

class Game {
  constructor() {
    this.playerWithRandomFigure = new Utility().randomizeFigure();
    this.randomizedStartPlayer = this.playerWithRandomFigure[Math.floor(Math.random() * this.playerWithRandomFigure.length)];
    this.emptyField = new Array(9).fill("");
  };

  gameField() {
    return this.emptyField;
  };

  currentPlayer() {
    return this.randomizedStartPlayer;
  };

  move() {

  };

  result() {

  };

  message() {
    return new Message().emit(this.playerWithRandomFigure).gameStart;
  };
};

module.exports = Game;