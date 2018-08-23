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

  broadcast(type) {
    let message = "";
    // console.log(Object.keys(socket.adapter.sids[socket.id])[1]);
    // const type = new Utility().socketRoomType(socket);
    // if (type === "player") {
    if (type === "player") {
      const playerRoomLength = new Utility().playerRoomLength();
      playerRoomLength <= 1 ?
        message = this.text().welcome.player.one :
        message = this.text().welcome.player.two;
    } else {
      message = new this.text().welcome.spectator.all;
    };
    this.emit(type, message).welcomeMessage;
  };

  emit(type, message) {
    return {
      welcomeMessage: Global.io.in(type).emit("welcomeMessage", message),
      gameStart: ""
    };
  };
};

module.exports = Message;