"use strict";

const Global = require("../server.js");

class Utility {
  constructor() {
  }

  static removeFromClients(socket) {
    Global.clients = Global.clients.filter(client => client.id !== socket.id);
  }

  static playerRoomLength() {
    if (Global.clients.length !== 0 && Global.io.sockets.adapter.rooms.hasOwnProperty("player")) {
      return Global.io.sockets.adapter.rooms.player.length;
    } else {
      return 0;
    }
  }

  connectedPlayer() {
    return Global.clients.filter(client =>
      client.type === "player");
  }

  randomizeSymbol() {
    const connectedPlayer = this.connectedPlayer();
    const possibleSymbol = "XO";
    connectedPlayer[0].symbol = possibleSymbol.charAt(Math.floor(Math.random() * possibleSymbol.length));
    connectedPlayer[0].symbol === "X" ?
      connectedPlayer[1].symbol = "O" :
      connectedPlayer[1].symbol = "X";
    return connectedPlayer;
  }

  randomizedStartPlayer() {
    const playerWithRandomSymbol = this.randomizeSymbol();
    return playerWithRandomSymbol[Math.floor(Math.random() * playerWithRandomSymbol.length)];
  }

};

module.exports = Utility;