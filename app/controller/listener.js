"use strict";

const User = require("./user.js");
const Utility = require("../model/utility.js");
const Game = require("../../GameModule.js");
const Global = require("../../server.js");

class Listener {
  constructor() {
    this.on();
  };

  on() {
    Global.io.sockets.on("connection", socket => {
      new User().add(socket);
      if (new Utility().playerRoomLength() === 2) {
        new Game();
      };

      socket.on("disconnect", () => {
        new User().remove(socket);
      });

      socket.on("fieldClicked", data => {
        console.log(data);
      });
    });
  };
};

module.exports = Listener;