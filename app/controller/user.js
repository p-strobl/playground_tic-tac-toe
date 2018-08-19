"use strict";

const Utility = require("../model/utility.js");
const Message = require("../model/message.js");
const Room = require("../model/room.js");
// const Game = require("../../GameModule.js");

class User {
  constructor() {
    this.room = new Utility().divideUser();
  };

  add(socket) {
    new Utility().addToClients(socket, this.room);
    new Room().join(socket, this.room);
    new Message().determine(this.room, socket);
  };

  remove(socket) {
    new Utility().removeFromClients(socket);
    new Message().determine(this.room, socket);
  };
};

module.exports = User;