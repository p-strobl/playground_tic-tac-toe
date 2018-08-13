"use strict";

const Utility = require("./utility.js");
const Global = require("../../server.js");

class Message {
  constructor() {
    this.playerRoomLength = new Utility().playerRoomLength();
    this.message;
  };

  static to() {
    return {
      player: {
        one: "Bitte warten Sie auf Ihren Gegner!",
        two: "Zwei Spieler verbunden. Spiel kann beginnen!"
      },
      spectator: {
        all: "Es sind bereits zwei Spieler verbunden, versuchen Sie es später noch ein mal."
      }
    }
  };

  determine(room) {
    if (room === "player") {
      this.playerRoomLength <= 1 ?
        this.message = Message.to().player.one :
        this.message = Message.to().player.two;
    } else {
      this.message = Message.to().spectator.all;
    };
    this.emit(room, this.message);
  };

  emit(room, message) {
    Global.io.in(room).emit("message", message);
  };
};

module.exports = Message;