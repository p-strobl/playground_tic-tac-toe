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
  }

  move(clientMove) {
    clientMove.playerSymbol === "X" ?
    this.currentPlayer = "O" :
    this.currentPlayer = "X";
    
    if (this.gameField[clientMove.cellId] === "") {
      this.gameField[clientMove.cellId] = clientMove.playerSymbol;
    }
    
    const updateGameState = {
      currentPlayer: this.currentPlayer,
      clickedCell: clientMove.cellId,
      clickedPlayer: clientMove.playerSymbol,
      gameField: this.gameField
    };

    console.log("NEW GAMESTATE");
    console.table(updateGameState);
    Global.io.emit("gameState", updateGameState);
  }

  result() {

  }


};

module.exports = Game;