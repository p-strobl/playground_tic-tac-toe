"use strict";

const Utility = require("./utility.js");
const Message = require("./message.js");
const Room = require("./room.js");

class User {
  constructor() {
    this.room = new Utility().divideUser();
  }

  add(socket) {
    new Utility().addToClients(socket);
    new Room().join(socket, this.room);
    new Message().determine(this.room, socket);
  }

  remove(socket) {
    new Utility().removeFromClients(socket);
    new Message().determine(this.room, socket);
  }
};

module.exports = User;