// "use strict";

// const Server = require("./server.js")
// const connectedPlayer = require("./app/lib/connectedPlayer.js");

// class Game {
//   constructor(startPlayer) {
//     this.currentPlayer = startPlayer || "X";
//     this.gameField = new Array(9).fill(null);
//     this.result = "";
//   }

//   gameState() {
//     return {
//       currentPlayer: this.currentPlayer,
//       gameField: this.gameField,
//       result: this.result,
//       clickedPlayer: null,
//       clickedField: null,
//       status: null,
//       valid: false
//     };
//   }

//   static start() {
//     const randomizedSymbols = this.randomizeSymbol();
//     const playerSymbols = this.getPlayerSymbols(randomizedSymbols);
//     this.currentPlayer = this.randomizeStartPlayer(randomizedSymbols);
//     this.gameField = new Array(9).fill(null);
//     this.result = "";
//     return {
//       playerSymbols: playerSymbols,
//       gameState: { ...this.gameState(),
//         status: "Zwei Spieler verbunden. Spiel kann beginnen!",
//         valid: true
//       }
//     };
//     // Server.io.emit("startGame", {
//     //   playerSymbols: playerSymbols,
//     //   gameState: { ...this.gameState(),
//     //     status: "Zwei Spieler verbunden. Spiel kann beginnen!",
//     //     valid: true
//     //   }
//     // });
//   }

//   updateGameField(player, fieldId) {
//     this.gameField[fieldId] = player;
//   }

//   switchCurrentPlayer(player) {
//     player === "X" ?
//       this.currentPlayer = "O" :
//       this.currentPlayer = "X";
//     return this.currentPlayer;
//   }

//   validateMove(player, fieldId) {
//     if (this.gameField[fieldId] !== null && this.currentPlayer === player) {
//       return `Ungueltiger Zug: Feld ${fieldId} ist nicht frei!`;
//     } else if (player !== this.currentPlayer && this.result === "") {
//       return `Ungueltiger Zug: ${player} ist nicht am Zug!`;
//     } else if (this.result !== "") {
//       return `Ungueltiger Zug: Das Spiel ist zu Ende!`;
//     } else {
//       return true;
//     }
//   }

//   move(player, fieldId) {
//     let validateMove = this.validateMove(player, fieldId);
//     let gameState = null;
//     if (validateMove === true) {
//       this.updateGameField(player, fieldId);
//       this.determineResult(player);
//       this.switchCurrentPlayer(player);
//       gameState = { ...this.gameState(),
//         clickedPlayer: player,
//         clickedField: fieldId,
//         valid: true
//       }
//       validateMove = "";
//     } else {
//       gameState = { ...this.gameState(),
//         clickedPlayer: player,
//         clickedField: fieldId,
//         status: validateMove,
//         valid: false
//       }
//     }
//     Server.io.emit("updateGame", gameState);
//     return validateMove;
//   }

//   determineResult(player) {
//     const winCombinations = [
//       [0, 1, 2],
//       [3, 4, 5],
//       [6, 7, 8],
//       [0, 3, 6],
//       [1, 4, 7],
//       [2, 5, 8],
//       [0, 4, 8],
//       [2, 4, 6]
//     ];
//     let moves = this.gameField.reduce((foundItems, element, index) =>
//       (element === player) ? foundItems.concat(index) : foundItems, []);
//     for (let winArray of winCombinations.values()) {
//       let winnerFound = winArray.every(element => moves.includes(element));
//       if (winnerFound) {
//         this.result = player;
//         break;
//       } else if (winnerFound === false && !this.gameField.includes(null)) {
//         this.result = "-";
//         break;
//       }
//     }
//   }

//   randomizeSymbol() {
//     const player = connectedPlayer();
//     const possibleSymbol = "XO";
//     player[0].symbol = possibleSymbol.charAt(Math.floor(Math.random() * possibleSymbol.length));
//     player[0].symbol === "X" ?
//       player[1].symbol = "O" :
//       player[1].symbol = "X";
//     return player;
//   }

//   randomizeStartPlayer(randomizedSymbol) {
//     return randomizedSymbol[Math.floor(Math.random() * randomizedSymbol.length)].symbol;
//   }

//   getPlayerSymbols(playerWithRandomizedSymbol) {
//     return Object.values(playerWithRandomizedSymbol).map(player => {
//       return {
//         id: player.id,
//         symbol: player.symbol
//       };
//     });
//   }

// };

// module.exports.Game = Game;

"use strict";

const utility = require("./app/lib/utilities.js");

class Game {
  constructor(startPlayer) {
    this.currentPlayer = startPlayer || "X";
    this.gameField = new Array(9).fill(null);
    this.result = "";
  }

  state(player, fieldId, moveState) {
    return {
      currentPlayer: this.currentPlayer,
      gameField: this.gameField,
      result: this.result,
      clickedPlayer: player,
      clickedField: fieldId,
      status: moveState,
      // valid: null
    };
  }

  start(clients) {
    const randomizedSymbols = utility.randomizeSymbol(clients);
    const playerSymbols = utility.getPlayerSymbols(randomizedSymbols);
    this.currentPlayer = utility.randomizeStartPlayer(randomizedSymbols);
    this.gameField = new Array(9).fill(null);
    this.result = "";
    return {
      playerSymbols: playerSymbols,
      gameState: { ...this.state(),
        status: "Zwei Spieler verbunden. Spiel kann beginnen!",
        valid: true
      }
    };
  }

  updateGameField(player, fieldId) {
    this.gameField[fieldId] = player;
  }

  switchCurrentPlayer(player) {
    player === "X" ?
      this.currentPlayer = "O" :
      this.currentPlayer = "X";
    return this.currentPlayer;
  }

  validateMove(player, fieldId) {
    console.log("Start Validate", player, fieldId);
    if (this.gameField[fieldId] !== null && this.currentPlayer === player) {
      return `Ungueltiger Zug: Feld ${fieldId} ist nicht frei!`;
    } else if (player !== this.currentPlayer && this.result === "") {
      return `Ungueltiger Zug: ${player} ist nicht am Zug!`;
    } else if (this.result !== "") {
      return `Ungueltiger Zug: Das Spiel ist zu Ende!`;
    } else {
      return "";
    }
  }

  move(player, fieldId) {
    let validatedMove = this.validateMove(player, fieldId);
    // let gameState = null;
    if (validatedMove === "") {
      this.updateGameField(player, fieldId);
      this.determineResult(player);
      this.switchCurrentPlayer(player);
      // gameState = { ...this.state(),
      //   clickedPlayer: player,
      //   clickedField: fieldId,
      //   valid: true
      // };
      // } else {
      //   gameState = { ...this.state(),
      //     clickedPlayer: player,
      //     clickedField: fieldId,
      //     status: validatedMove,
      //     valid: false
      //   };
    }
    return validatedMove;
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
    let moves = this.gameField.reduce((foundItems, element, index) =>
      (element === player) ? foundItems.concat(index) : foundItems, []);
    for (let winArray of winCombinations.values()) {
      let winnerFound = winArray.every(element => moves.includes(element));
      if (winnerFound) {
        this.result = player;
        break;
      } else if (winnerFound === false && !this.gameField.includes(null)) {
        this.result = "-";
        break;
      }
    }
  }

};

module.exports.Game = Game;