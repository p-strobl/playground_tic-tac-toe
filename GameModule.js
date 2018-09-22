"use strict";

// const Utility = require("./app/utility.js");
const Server = require("./server.js")
let connectedPlayer = require("./app/module/connectedPlayer.js");
// const View = require("./app/view/updateField.js")
// const Emit = require("./app/emit.js");

class Game {
  constructor(startPlayer) {
    this._currentPlayer = startPlayer;
    this._gameField = new Array(9).fill(null);
    this.result = "";
  }

  start() {
    const playerWithRandomizedSymbol = this.randomizeSymbol();
    const playerSymbols = this.getPlayerSymbol(playerWithRandomizedSymbol);
    this._currentPlayer = this.randomizedStartPlayer(playerWithRandomizedSymbol);
    Server.io.emit("startGame", {
      playerSymbols: playerSymbols,
      gameState: {
        currentPlayer: this._currentPlayer,
        gameField: this._gameField,
        result: this.result,
        running: true
      }
    });
  }

  set gameField(playerSymbol) {
    this._gameField = playerSymbol;
  }

  get gameField() {
    return this._gameField;
  }

  get currentPlayer() {
    // if (this._currentPlayer === undefined) {
    //   this._currentPlayer = "X";
    // }
    return this._currentPlayer;
  }

  set currentPlayer(player) {
    this._currentPlayer = player;
  }

  move(clientMove) {

    // this._gameField = clientMove.cellId;
    if (clientMove.playerSymbol === "X") {
      this._currentPlayer = "O";
    } else {
      this._currentPlayer = "X"
    }

    if (this._gameField[clientMove.cellId] === null) {
      this._gameField[clientMove.cellId] = clientMove.playerSymbol;
      // this._gameField[clientMove.cellId] = clientMove.playerSymbol;
    }

    const updatedGameState = {
      gameState: {
        currentPlayer: this._currentPlayer,
        clickedPlayer: clientMove.playerSymbol,
        clickedCell: clientMove.cellId,
        gameField: this._gameField,
        result: null,
        running: null
      }
    };

    Server.io.emit("updateGame", updatedGameState);
    console.log(updatedGameState.gameState.gameField);

    // console.log("NEW GAMESTATE");
    // console.table(updateGameState);
    // Global.io.emit("gameState", updateGameState);
  }

  result() {

  }

  // connectedPlayer() {
  //   return Global.clients.filter(client =>
  //     client.type === "player");
  // }



  randomizeSymbol() {
    const player = connectedPlayer();
    const possibleSymbol = "XO";
    player[0].symbol = possibleSymbol.charAt(Math.floor(Math.random() * possibleSymbol.length));
    player[0].symbol === "X" ?
      player[1].symbol = "O" :
      player[1].symbol = "X";
    return player;
  }

  randomizedStartPlayer(randomizedSymbol) {
    return randomizedSymbol[Math.floor(Math.random() * randomizedSymbol.length)].symbol;
  }

  getPlayerSymbol(playerWithRandomizedSymbol) {
    return Object.values(playerWithRandomizedSymbol).map(player => {
      return {
        id: player.id,
        symbol: player.symbol
      };
    });
  }

};

module.exports.Game = Game;