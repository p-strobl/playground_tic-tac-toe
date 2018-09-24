"use strict";

const Server = require("./server.js")
const connectedPlayer = require("./app/module/connectedPlayer.js");

class Game {
  constructor(startPlayer) {
    this.currentPlayer = startPlayer;
    this.gameField = new Array(9).fill(null);
    this.result = "";
  }

  start() {
    const playerWithRandomizedSymbol = this.randomizeSymbol();
    const playerSymbols = this.getPlayerSymbol(playerWithRandomizedSymbol);
    this.currentPlayer = this.randomizedStartPlayer(playerWithRandomizedSymbol);
    Server.io.emit("startGame", {
      playerSymbols: playerSymbols,
      gameState: {
        currentPlayer: this.currentPlayer,
        gameField: this.gameField,
        result: this.result,
        running: true
      },
      statusMessage: "Zwei Spieler verbunden. Spiel kann beginnen!"
    });
  }

  gameField(clientMove) {
    this.gameField[clientMove.cellId] = clientMove.playerSymbol;
  }

  currentPlayer(player) {
    if (player === "X" || this.currentPlayer === undefined) {
      this.currentPlayer = "O";
    } else {
      this.currentPlayer = "X";
    }
  }

  move(clientMove) {
    console.log(clientMove);
    console.log(this.gameField);
    this.currentPlayer(clientMove.player);
    this.gameField(clientMove);

    const updatedGameState = {
      gameState: {
        currentPlayer: this.currentPlayer,
        gameField: this.gameField,
        result: null,
        running: null,
        clickedPlayer: clientMove.playerSymbol,
        clickedCell: clientMove.cellId
      }
    };

    console.log(updatedGameState.gameState.gameField);
    Server.io.sockets.emit("updateGame", updatedGameState);
  }

  result() {

  }

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