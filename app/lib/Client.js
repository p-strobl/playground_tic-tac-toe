"use strict";

const utility = require("./utilities.js");

class Client {
  constructor(io, socket, clients) {
    this.id = socket.id;
    this.type = this.defineType(io, socket, clients);
    this.joinRoom(socket);
  }

  defineType(io, socket, clients) {
    const type = utility.playerRoomCount(io, clients) < 2 ?
      "player" :
      "spectator";
    return type;
  }

  joinRoom(socket) {
    socket.join(this.type);
  }

};

module.exports = Client;