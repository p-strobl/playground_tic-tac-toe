"use strict";

const Utility = require("./app/model/utility.js");
const Message = require("./app/model/message.js");

class Game {
  constructor(startPlayer) {
    this.startPlayer = startPlayer;
  };

  gameField() {
    const emptyField = new Array(9).fill("");
    return emptyField;
  };

  currentPlayer() {
    const playerWithRandomFigure = new Utility().randomizeFigure();
    const randomizedStartPlayer = playerWithRandomFigure[Math.floor(Math.random() * playerWithRandomFigure.length)];
    return randomizedStartPlayer;
  };

  move(currentPlayer, clickedField) {
    console.log(currentPlayer);
    console.log(clickedField);
  };

  result() {

  };

  message() {
    return new Message().emit(this.playerWithRandomFigure).gameStart;
  };
};

module.exports = Game;