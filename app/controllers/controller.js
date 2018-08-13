"use strict";

const User = require("../models/user.js");
const Global = require("../../server.js");

class GameController {
  constructor() {
    this.listen();
  }

  listen() {
    Global.io.sockets.on("connection", socket => {
      new User().add(socket);

      socket.on("disconnect", () => {
        new User().remove(socket);
      });

      socket.on("fieldClicked", data => {
        console.log(data);
      });
    });
  }
};

module.exports = GameController;