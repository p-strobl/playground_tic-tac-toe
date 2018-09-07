"use strict";

const Utility = require("./app/utility.js");
const View = require("./app/view/updateField.js")
const Message = require("./app/message.js");

class Game {
  constructor(player) {
    // this.randomizedStartPlayer = randomizedStartPlayer;
    this.player = player;
    this.field = new Array(9).fill("");
    // this.field = [["", "", ""], ["", "", ""], ["", "", ""]];

  }

  currentPlayer() {
    // const playerWithRandomFigure = new Utility().randomizeSymbol();
    // const randomizedStartPlayer = playerWithRandomFigure[Math.floor(Math.random() * playerWithRandomFigure.length)];
    // return randomizedStartPlayer;
  }

  move(socketMove) {
    console.log(socketMove);
    // this.field[fieldId] = symbol;
    // new View(symbol, fieldId).updateField();
    // let updatedfield = [];
    // this.field = [].concat(...this.field);
    // this.field[fieldId] = symbol;
    // while (this.field.length) {
    //   updatedfield.push(this.field.splice(0, 3));
    // }
    // this.field = updatedfield;
  }

  result() {

  }
};

module.exports = Game;