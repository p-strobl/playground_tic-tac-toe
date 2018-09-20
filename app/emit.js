"use strict";

const Utility = require("./utility.js");
const Global = require("../server.js");

class Emit {
  constructor() {};

  text() {
    return {
      welcome: {
        player: {
          one: "Bitte warten Sie auf Ihren Gegner!",
          two: "Zwei Spieler verbunden. Spiel kann beginnen!"
        },
        spectator: {
          all: "Sorry, es waren bereits genug Spieler online."
        }
      },
      gameStart: {
        player: {
          one: "",
          two: ""
        }
      },
      gameChange: {
        player: {
          one: "",
          two: ""
        }
      },
      gameEnd: {
        player: {
          one: "",
          two: ""
        }
      }
    };
  };

  playerSymbol() {
    const connectedPlayer = new Utility().connectedPlayer();
    Global.io.in("player").emit("playerSymbol",
      Object.values(connectedPlayer).map(player => {
        return {
          id: player.id,
          symbol: player.symbol
        };
      }));
  }

  statusOnePlayer() {
    Global.io.in("player").emit("footerStatus",
      "Bitte warten Sie auf Ihren Gegner!");
  }

  statusTwoPlayer() {
    Global.io.in("player").emit("footerStatus",
      "Zwei Spieler verbunden. Spiel kann beginnen!")
  }

  statusSpectator() {
    Global.io.in("spectator").emit("footerStatus",
      "Sorry, es waren bereits genug Spieler online.");
  }

  currentPlayer(currentPlayer) {
    Global.io.emit("currentPlayer", currentPlayer);
  }

  startPlayer(startPlayer) {
    // console.log(startPlayer);
    Global.io.emit("startPlayer", startPlayer);
  }

  clientState(player) {
    Global.io.in("player").emit("clientState", player);
    Global.io.emit();
  }

  gameState(game) {
    Global.io.emit("gameState", game);
    // console.log(game);
  }
};

module.exports = Emit;