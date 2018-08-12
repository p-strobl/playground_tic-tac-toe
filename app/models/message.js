"use strict";

const Utility = require("./utility.js");
const Global = require("../../server.js");

class Message {
  constructor() {
    this.playerRoomLength = new Utility().playerRoomLength();
    this.message = "";
  };

  text() {
    const player = {
      one: "Bitte warten Sie auf Ihren Gegner!",
      two: "Zwei Spieler verbunden. Spiel kann beginnen!"
    };
    const spectator = {
      all: "Es sind bereits zwei Spieler verbunden, versuchen Sie es später noch ein mal."
    };
  };

  determine(room) {
    console.log(this.text());
    // console.log(this.text());
    // console.log(this.text().player);
    if (room === "player") {
      switch (true) {
        case this.playerRoomLength <= 1:
          this.message = this.text().player.one;
          // this.message = "Player One";
          break;
        case this.playerRoomLength === 2:
          this.message = this.text().player.two;
          // this.message = "Player Two";
          break;
        default:
      };
    } else {
      this.message = this.text().spectator.all;
      // this.message = "Spectator";
    };
    this.emit(room, this.message);
  };

  emit(room, message) {
    console.log(room);
    Global.io.in(room).emit("message", message);
  };
};

module.exports = Message;