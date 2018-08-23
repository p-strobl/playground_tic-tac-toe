"use strict";

const Utility = require("../model/utility.js");
const Message = require("../model/message.js");
const Global = require("../../server.js");
// const Game = require("../../GameModule.js");

class User {
  constructor(socket) {
    this.socket = socket;
    this.playerRoomCount = new Utility().playerRoomLength();
    this.type = this.divideUser();
    this.addToClients();
    this.joinRoom();
    new Message().broadcast(this.type);
  };

  divideUser() {
    return this.playerRoomCount < 2 ?
      "player" :
      "spectator";
  };

  addToClients() {
    Global.clients.push({
      type: this.type,
      id: this.socket.id,
      figure: ""
    });
  };

  joinRoom() {
    this.socket.join(this.type);
  };
};

module.exports = User;