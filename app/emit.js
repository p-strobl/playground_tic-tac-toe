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

  emit(type, message) {
    return {
      welcomeStatus: Global.io.in(type).emit("status", message),
      gameStart: ""
    };
  };

  status(type) {
    let message = "";
    if (type === "player") {
      Utility.playerRoomLength() <= 1 ?
        message = this.text().welcome.player.one :
        message = this.text().welcome.player.two;
    } else {
      message = this.text().welcome.spectator.all;
    };
    this.emit(type, message).welcomeStatus;
  };

  get symbol() {
    const connectedPlayer = new Utility().connectedPlayer();
    Global.io.in("player").emit("clientSymbol",
      Object.values(connectedPlayer).map(element => {
        return {
          id: element.id,
          symbol: element.symbol
        };
      }));
  }

  startPlayer(startPlayer) {
    console.log(startPlayer);
    Global.io.emit("startPlayer", startPlayer);
  }
};

module.exports = Emit;