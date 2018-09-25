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
    const randomizedSymbols = this.randomizeSymbol();
    const playerSymbols = this.getPlayerSymbols(randomizedSymbols);
    this.currentPlayer = this.randomizeStartPlayer(randomizedSymbols);
    Server.io.emit("startGame", {
      playerSymbols: playerSymbols,
      gameState: {
        currentPlayer: this.currentPlayer,
        gameField: this.gameField,
        result: this.result,
        statusMessage: "Zwei Spieler verbunden. Spiel kann beginnen!"
      }
    });
  }

  updateGameField(player, cellId) {
    this.gameField[cellId] = player;
  }

  switchCurrentPlayer(player) {
    if (player === "X" || this.currentPlayer === undefined) {
      this.currentPlayer = "O";
    } else {
      this.currentPlayer = "X";
    }
  }


  move(player, cellId) {
    this.updateGameField(player, cellId);
    this.result = this.determineResult(player, cellId);
    console.log(this.result);
    this.switchCurrentPlayer(player);

    const updatedGameState = {
      gameState: {
        currentPlayer: this.currentPlayer,
        gameField: this.gameField,
        result: this.result,
        running: null,
        clickedPlayer: player,
        clickedCell: cellId,
        statusMessage: `Das Spiel läuft, Spieler ${this.currentPlayer}, ist am Zug.`
      }
    };

    Server.io.sockets.emit("updateGame", updatedGameState);
  }


  determineResult(player, cellId) {
    console.log(player);
    console.log(cellId);
    console.log(this.gameField);




    return "bla";


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

  randomizeStartPlayer(randomizedSymbol) {
    return randomizedSymbol[Math.floor(Math.random() * randomizedSymbol.length)].symbol;
  }

  getPlayerSymbols(playerWithRandomizedSymbol) {
    return Object.values(playerWithRandomizedSymbol).map(player => {
      return {
        id: player.id,
        symbol: player.symbol
      };
    });
  }

};

module.exports.Game = Game;