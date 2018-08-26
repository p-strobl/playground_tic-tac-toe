"use strict";

const Global = require("../../server.js");

class Utility {
  constructor() {}

  static removeFromClients(socket) {
    Global.clients = Global.clients.filter(client => client.id !== socket.id);
  };

  static playerRoomLength() {
    if (Global.clients.length !== 0 && Global.io.sockets.adapter.rooms.hasOwnProperty("player")) {
      return Global.io.sockets.adapter.rooms.player.length;
    } else {
      return 0;
    };
  };

  connectedPlayer() {
    return Global.clients.filter(client =>
      client.type === "player");
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

  randomizedStartPlayer() {
    const playerWithRandomFigure = this.randomizeFigure();
    return playerWithRandomFigure[Math.floor(Math.random() * playerWithRandomFigure.length)];
  };

};

module.exports = Utility;