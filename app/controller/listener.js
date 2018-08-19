"use strict";

const User = require("./user.js");
const Utility = require("../model/utility.js");
const Global = require("../../server.js");

class Listener {
  constructor() {
    this.on();
  };

  on() {
    Global.io.sockets.on("connection", socket => {
      new User().add(socket);
      // console.log(new Utility().getPlayers());

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