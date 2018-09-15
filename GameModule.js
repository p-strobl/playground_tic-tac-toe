"use strict";

const Utility = require("./app/utility.js");
const Global = require("./server.js")
// const View = require("./app/view/updateField.js")
const Emit = require("./app/emit.js");

class Game {
  constructor(startPlayer) {
    this.startPlayer = startPlayer;
    this.field = new Array(9).fill("");
  }

  get currentPlayer() {
    if (this.startPlayer === undefined) {
      this.startPlayer = "X";
    }
    new Emit().startPlayer(this.startPlayer);
    return this.startPlayer;
    // return this.startPlayer === undefined ?
    //   this.startPlayer = new Utility().randomizedStartPlayer().symbol :
    //   this.startPlayer;
  }

  move(socketMove) {
    console.log(socketMove);
  }

  result() {

  }


};

module.exports = Game;