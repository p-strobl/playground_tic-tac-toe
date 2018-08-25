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
      if (new Utility().playerRoomLength() === 2) {
        new Game();
      };

      socket.on("disconnect", () => {
        new Utility().removeFromClients(socket);
        new Message().to(socket.type);
      });

      socket.on("fieldClicked", data => {
        console.log(data);
      });
    });
  };
};

module.exports = Listener;