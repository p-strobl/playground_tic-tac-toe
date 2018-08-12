"use strict";

const Utility = require("./utility.js");
const Message = require("./message.js");
const Room = require("./room.js");

class User {
  constructor() {
    this.room = new Utility().divideUser();
  }

  add(socket) {
    // console.log("before add player: " + new Utility().playerRoomLength());
    new Utility().addToClients(socket);
    new Room().join(socket, this.room);
    // console.log("after add player: " + new Utility().playerRoomLength());
    new Message().determine(this.room, socket);
  }

  remove(socket) {
    // console.log("before remove player: " + new Utility().playerRoomLength());
    new Utility().removeFromClients(socket);
    // console.log("after remove player: " + new Utility().playerRoomLength());
    new Message().determine(this.room, socket);
  }
};

module.exports = User;