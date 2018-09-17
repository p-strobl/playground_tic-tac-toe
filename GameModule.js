"use strict";

const Utility = require("./app/utility.js");
const Global = require("./server.js")
// const View = require("./app/view/updateField.js")
const Emit = require("./app/emit.js");

class Game {
  constructor(startPlayer) {
    this.startPlayer = startPlayer;
    this.fieldState = new Array(9).fill("");
  }

  set gameField() {}

  get gameField() {
    let fieldState = this.fieldState;
    return fieldState
  }

  get currentPlayer() {
    if (this.startPlayer === undefined) {
      this.startPlayer = "X";
    }
    // new Emit().startPlayer(this.startPlayer);
    return this.startPlayer;
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