"use strict";

const Utility = require("./app/utility.js");
const Global = require("./server.js")
// const View = require("./app/view/updateField.js")
// const Message = require("./app/message.js");

class Game {
  constructor() {
    this.field = new Array(9).fill("");
    this.connectedPlayer = new Utility().connectedPlayer();
    this.startPlayer = this.currentPlayer();
    this.emitSymbol();
    this.emitStartPlayer();
    // this.field = [["", "", ""], ["", "", ""], ["", "", ""]];

  }

  currentPlayer() {
    return new Utility().randomizedStartPlayer().symbol;
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

  emitSymbol() {
    Global.io.in("player").emit("userSymbol",
      Object.values(this.connectedPlayer).map(element => {
        return {
          id: element.id,
          symbol: element.symbol
        };
      }));
  }

  emitStartPlayer() {
    Global.io.in("player").emit("startPlayer", this.startPlayer);
  }
};

module.exports = Game;