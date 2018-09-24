"use strict";

const Utility = require("./utility.js");
const Server = require("../../server.js");
const playerRoomLength = require("./playerRoomLength.js");
// const Global = require("../server.js");

class Client {
  constructor(socket) {
    this.socket = socket;
    this.type = this.defineType();
    this.addToClients();
    this.joinRoom();
    this.emitClientType();
  }

  defineType() {
    return playerRoomLength() < 2 ?
      "player" :
      "spectator";
  }

  addToClients() {
    this.socket.type = this.type;
    Server.clients.push(this.socket);
  }

  joinRoom() {
    this.socket.join(this.type);
  }

  emitClientType() {
    this.socket.emit("setClientType", Server.clients.find(client =>
      client.id === this.socket.id).type);
  }

};

module.exports = Client;