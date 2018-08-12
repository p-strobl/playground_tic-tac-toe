"use strict";

const Global = require("../../server.js");

class Utility {
  constructor() {}

  divideUser() {
    return this.playerRoomLength() < 2 ?
      "player" :
      "spectator";
  }

  addToClients(socket) {
    Global.clients.push(socket);
  };

  removeFromClients(socket) {
    Global.clients = Global.clients.filter(client => client.id !== socket.id);
  }

  playerRoomLength() {
    if (Global.clients.length === 0) {
      return 0;
    } else {
      if (Global.clients[Global.clients.length - 1].adapter.rooms.hasOwnProperty("player")) {
        return Global.clients[Global.clients.length - 1].adapter.rooms.player.length;
      } else {
        return 0;
      }
    }
  };

};
module.exports = Utility;