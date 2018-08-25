"use strict";

const Utility = require("./utility.js");
const Global = require("../../server.js");

class Message {
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

  to(type) {
    let message = "";
    if (type === "player") {
      const playerRoomLength = new Utility().playerRoomLength();
      playerRoomLength <= 1 ?
        message = this.text().welcome.player.one :
        message = this.text().welcome.player.two;
    } else {
      message = this.text().welcome.spectator.all;
    };
    this.emit(type, message).welcomeStatus;
  };
};

module.exports = Message;