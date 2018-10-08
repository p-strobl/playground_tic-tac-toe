"use strict";
//@ts-check

const utility = require("./app/lib/utilities.js");

/** Create default Game */
class Game {
  /**
   * @constructor Game
   * @param {String || undefined} startPlayer testGame.js passes a startplayer, else it's undefined 
   */
  constructor(startPlayer) {
    this.currentPlayer = startPlayer || "X";
    this.gameField = new Array(9).fill(null);
    this.result = "";
  }

  /**
   * Set's default game values and determine player symbols
   * @function start
   * @param   {Array}  clients Global client array
   * @returns {Object} new game state and player symbols
   */
  start(clients) {
    const randomizedSymbols = utility.randomizeSymbol(clients);
    const playerSymbols = utility.getPlayerSymbols(randomizedSymbols);
    this.currentPlayer = utility.randomizeStartPlayer(randomizedSymbols);
    this.gameField = new Array(9).fill(null);
    this.result = "";
    this.status = "Zwei Spieler verbunden. Spiel kann beginnen!";
    return {
      game: this,
      playerSymbols: playerSymbols
    };
  }

  /**
   * Add's player symbol to gameField array based on given fieldId
   * @function updateGameField
   * @param {String} player  Clicked player
   * @param {Number} fieldId Clicked field ID
   */
  updateGameField(player, fieldId) {
    this.gameField[fieldId] = player;
  }

  /**
   * Switches current player
   * @function switchCurrentPlayer
   * @param   {String} player Clicked player
   * @returns {String} New determined player symbol
   */
  switchCurrentPlayer(player) {
    player === "X" ?
      this.currentPlayer = "O" :
      this.currentPlayer = "X";
    return this.currentPlayer;
  }

  /**
   * Determine message if a wrong move occured
   * @function determineFailedMove
   * @param   {String} player Clicked player
   * @param   {Number} fieldId Clicked field ID
   * @returns {String} Error message
   */
  determineFailedMove(player, fieldId) {
    if (this.gameField[fieldId] !== null && this.currentPlayer === player) {
      return `Ungueltiger Zug: Feld ${fieldId} ist nicht frei!`;
    } else if (player === "spectator") {
      return "Sie können gerade nicht in das Spielgeschehen eingreifen, bitte genießen Sie das laufende Spiel!";
    } else if (player !== this.currentPlayer && this.result === "") {
      return `Ungueltiger Zug: ${player} ist nicht am Zug!`;
    } else if (this.result === "X" || this.result === "O" || this.result === "-") {
      return `Ungueltiger Zug: Das Spiel ist zu Ende!`;
    } else {
      return "";
    }
  }

  /**
   * Determine message when the game end's
   * @function determineEndGame
   * @param   {String} result End game result
   * @returns {String} Based on the determineResult function
   */
  determineEndGame(result) {
    switch (result) {
      case "X":
      case "O":
        return `Spiel beendet: Spieler ${result} hat gewonnen!`;
      case "-":
        return "Spiel endet unentschieden!";
      default:
        return "";
    }
  };

  /**
   * If valid move, update current game object
   * Else determine error message
   * @function move
   * @param   {String} player Clicked player
   * @param   {Number} fieldId Clicked field ID
   * @returns {Object} Valid current game || Invalid error message
   */
  move(player, fieldId) {
    let moveFailed = this.determineFailedMove(player, fieldId);
    if (moveFailed === "") {
      this.updateGameField(player, fieldId);
      this.switchCurrentPlayer(player);
      this.determineResult(player);
      this.status = this.determineEndGame(this.result);
      this.valid = true;
      this.clickedPlayer = player;
      this.clickedField = fieldId;
    } else {
      this.status = moveFailed;
      this.valid = false;
    }
    return moveFailed;
  }

  /**
   * Determine game result
   * @function determineResult
   * @param   {String} player Clicked player
   * @returns {String} player symbol || draw symbol || empty string
   */
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

    let moves = this.gameField.reduce((foundItems, element, index) =>
      (element === player) ? foundItems.concat(index) : foundItems, []);
    if (moves.length > 2) {
      for (let winArray of winCombinations.values()) {
        let winnerFound = winArray.every(element => moves.includes(element));
        if (winnerFound) {
          this.result = player;
          break;
        } else if (winnerFound === false && !this.gameField.includes(null)) {
          this.result = "-";
          break;
        } else {
          this.result = "";
        }
      }
    } else {
      this.result = "";
    }
  }

};

module.exports.Game = Game;