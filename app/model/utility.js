"use strict";

const Global = require("../../server.js");

class Utility {
  constructor() {}

  divideUser() {
    return this.playerRoomLength() < 2 ?
      "player" :
      "spectator";
  };

  addToClients(socket, room) {
    // Global.clients.push(socket);
    Global.clients.push({
      type: room,
      id: socket.id,
      figure: ""
    });
  };

  removeFromClients(socket) {
    Global.clients = Global.clients.filter(client => client.id !== socket.id);
  }

  playerRoomLength() {
    if (Global.clients.length !== 0 && Global.io.sockets.adapter.rooms.hasOwnProperty("player")) {
      return Global.io.sockets.adapter.rooms.player.length;
    } else {
      return 0;
    };
  };

  connectedPlayer() {
    return Global.clients.filter(client => client.type === "player");
  };

  randomizeFigure() {
    const connectedPlayer = this.connectedPlayer();
    const possibleFigure = "XO";
    connectedPlayer[0].figure = possibleFigure.charAt(Math.floor(Math.random() * possibleFigure.length));
    connectedPlayer[0].figure === "X" ?
      connectedPlayer[1].figure = "O" :
      connectedPlayer[1].figure = "X";
    return connectedPlayer;
  };

};

module.exports = Utility;