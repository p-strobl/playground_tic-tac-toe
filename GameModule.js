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
    this.gameField = new Array(9).fill(null);
    this.result = "";
    Server.io.emit("startGame", {
      playerSymbols: playerSymbols,
      gameState: {
        currentPlayer: this.currentPlayer,
        gameField: this.gameField,
        result: this.result,
        running: true,
        statusMessage: "Zwei Spieler verbunden. Spiel kann beginnen!"
      }
    });
  }

  updateGameField(player, cellId) {
    this.gameField[cellId] = player;
  }

  switchCurrentPlayer(player) {
    player === "X" || this.currentPlayer === undefined ?
      this.currentPlayer = "O" :
      this.currentPlayer = "X";
  }

  move(player, cellId) {
    this.updateGameField(player, cellId);
    this.result = this.determineResult(player);
    console.log(this.result);
    this.switchCurrentPlayer(player);

    const updatedGameState = {
      gameState: {
        currentPlayer: this.currentPlayer,
        gameField: this.gameField,
        result: this.result,
        running: true,
        clickedPlayer: player,
        clickedCell: cellId,
        statusMessage: ""
      }
    };

    Server.io.sockets.emit("updateGame", updatedGameState);
  }

  determineResult(player) {
    const winCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    let winner = "";

    let moves = this.gameField.reduce((foundItems, element, index) =>
      (element === player) ? foundItems.concat(index) : foundItems, []);

    for (let winArray of winCombinations.values()) {
      if (winArray.every(element => moves.indexOf(element) > -1)) {
        winner = player;
        break;
      }
    }
    return winner;
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