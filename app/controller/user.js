"use strict";

const Utility = require("../model/utility.js");
const Message = require("../model/message.js");
const Global = require("../../server.js");
// const Game = require("../../GameModule.js");

class User {
  constructor(socket) {
    this.socket = socket;
    this.playerRoomCount = Utility.playerRoomLength();
    this.type = this.divideUser();
    this.addToClients();
    this.joinRoom();
    new Message().status(this.type);
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