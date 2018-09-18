"use strict";

const Utility = require("./app/utility.js");
const Global = require("./server.js")
// const View = require("./app/view/updateField.js")
const Emit = require("./app/emit.js");

class Game {
  constructor(startPlayer) {
    this.currentPlayer = startPlayer;
    this.gameField = new Array(9).fill("");
    this.result = "";
  }

  gameField() {
    return this._gameField;
  }

  set currentPlayer(player) {
    this._currentPlayer = player;
    new Emit().currentPlayer(this._currentPlayer);
  }

  get currentPlayer() {
    if (this._currentPlayer === undefined) {
      this._currentPlayer = "X";
    }
    return this._currentPlayer;
    // new Emit().startPlayer(this.startPlayer);
    // return this._currentPlayer;
    // return this.startPlayer === undefined ?
    //   this.startPlayer = new Utility().randomizedStartPlayer().symbol :
    //   this.startPlayer;
  }

  move(clientMove) {
    let currentPlayer = "";
    const updateGameState = {
      currentPlayer: currentPlayer,
      clickedCell: clientMove.cellId,
      clickedPlayer: clientMove.playerSymbol,
      fieldState: this.gameField
    };

    clientMove.playerSymbol === "X" ?
      updateGameState.currentPlayer = "O" :
      updateGameState.currentPlayer = "X";

    if (this.field[clientMove.cellId] === "") {
      this.field[clientMove.cellId] = clientMove.playerSymbol;
    }

    console.log(updateGameState);
    Global.io.emit("gameState", updateGameState);
    // console.log(clientMove);
  }

  result() {

  }


};

module.exports = Game;