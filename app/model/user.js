"use strict";

const Utility = require("./utility.js");
const Global = require("../../server.js");

class User {
  constructor(socket) {
    this.socket = socket;
    this.playerRoomCount = Utility.playerRoomLength();
    this.type = this.divideUser();
    this.addToClients();
    this.joinRoom();
  };

  divideUser() {
    return this.playerRoomCount < 2 ?
      "player" :
      "spectator";
  };

  addToClients() {
    this.socket.type = this.type;
    this.socket.figure = "";
    Global.clients.push(this.socket);
  };

  joinRoom() {
    this.socket.join(this.type);
  };
};

module.exports = User;