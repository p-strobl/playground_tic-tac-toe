"use strict";

const Utility = require("./app/utility.js");
const Global = require("./server.js")
const View = require("./app/view/updateField.js")
const Message = require("./app/message.js");

class Game {
  constructor() {
    // this.randomizedStartPlayer = randomizedStartPlayer;
    // this.startPlayer = startPlayer;
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
    // const connectedPlayer = new Utility().connectedPlayer();
    // Global.io.in("player").emit("userSymbolAndStartPlayer", Object.values(connectedPlayer).map(element => {
    //   return {id: element.id, symbol: element.symbol, startPlayer: this.startPlayer};
    // }));
    Global.io.in("player").emit("userSymbol",
      Object.values(this.connectedPlayer).map(element => {
        return {id: element.id, symbol: element.symbol};
      }));
  }

  emitStartPlayer() {
    Global.io.in("player").emit("userStartPlayer", this.startPlayer);
  }
};

module.exports = Game;