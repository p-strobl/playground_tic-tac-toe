"use strict";

const User = require("./user.js");
const Utility = require("../model/utility.js");
const Message = require("../model/message.js");
const Game = require("../../GameModule.js");
const Global = require("../../server.js");

class Listener {
  constructor() {
    this.listen();
  };

  listen() {
    Global.io.sockets.on("connection", socket => {
      new User(socket);
      if (Utility.playerRoomLength() === 2) {
        new Game(new Utility().randomizedStartPlayer());
      };

      socket.on("disconnect", () => {
        Utility.removeFromClients(socket);
        new Message().status(socket.type);
      });

      socket.on("fieldClicked", data => {
        console.log(data);
      });
    });
  };
};

module.exports = Listener;