"use strict";

const Utility = require("./utility.js");
const Global = require("../../server.js");

class Message {
  constructor() {
    // this.playerRoomLength = new Utility().playerRoomLength();
    // this.message;
  };

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

  welcome(room) {
    let message = "";
    if (room === "player") {
      const playerRoomLength = new Utility().playerRoomLength();
      playerRoomLength <= 1 ?
        message = new Message().text().welcome.player.one :
        message = new Message().text().welcome.player.two;
    } else {
      message = new Message().text().welcome.spectator.all;
    };
    this.emit(room, message).welcomeMessage;
  };

  emit(room, message) {
    return {
      welcomeMessage: Global.io.in(room).emit("welcomeMessage", message),
      gameStart: ""
    };
  };
};

module.exports = Message;