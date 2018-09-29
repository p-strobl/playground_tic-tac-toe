"use strict";

const Server = require("./server.js")
const connectedPlayer = require("./app/module/connectedPlayer.js");

class Game {
  constructor(startPlayer) {
    this.currentPlayer = startPlayer;
    this.gameField = new Array(9).fill(null);
    this.result = "";
  }

  gameState() {
    return {
      currentPlayer: this.currentPlayer,
      gameField: this.gameField,
      result: this.result,
      running: null,
      clickedPlayer: null,
      clickedField: null,
      status: null
    };
  }

  start() {
    const randomizedSymbols = this.randomizeSymbol();
    const playerSymbols = this.getPlayerSymbols(randomizedSymbols);
    this.currentPlayer = this.randomizeStartPlayer(randomizedSymbols);
    this.gameField = new Array(9).fill(null);
    this.result = "";
    let gameState = this.gameState();
    gameState.running = true;
    gameState.status = "twoPlayerStart";
    Server.io.emit("startGame", {
      playerSymbols: playerSymbols,
      gameState: gameState
    });
  }

  updateGameField(player, fieldId) {
    this.gameField[fieldId] = player;
  }

  switchCurrentPlayer(player) {
    player === "X" || this.currentPlayer === undefined ?
      this.currentPlayer = "O" :
      this.currentPlayer = "X";
    return this.currentPlayer;
  }

  move(player, fieldId) {
    this.updateGameField(player, fieldId);
    this.result = this.determineResult(player);
    let gameState = this.gameState();
    gameState.clickedPlayer = player;
    gameState.clickedField = fieldId;
    if (this.result !== "" && this.result !== "-") {
      gameState.status = "won";
      gameState.running = false;
    } else if (this.result === "-") {
      gameState.status = "tie";
      gameState.running = false;
    } else {
      gameState.currentPlayer = this.switchCurrentPlayer(player);
      gameState.running = true;
    }
    Server.io.emit("updateGame", gameState);
    return this.result;
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
    let result = "";
    let moves = this.gameField.reduce((foundItems, element, index) =>
      (element === player) ? foundItems.concat(index) : foundItems, []);
    for (let winArray of winCombinations.values()) {
      let winnerFound = winArray.every(element => moves.includes(element));
      if (winnerFound) {
        result = player;
        break;
      } else if (winnerFound === false && moves.length === 5) {
        result = "-";
        break;
      }
    }
    return result;
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