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

  getCurrentPlayers() {
    return Global.clients.filter(client => client.type === "player");
    // console.log(Global.clients.forEach(element => element.find(item => item === "player")));
    // return Object.values(Global.io.sockets.adapter.rooms.player);
  };

  randomizePlayers() {
    const player = this.getCurrentPlayers();
    const possibleFigure = "XO";
    player[0].figure = possibleFigure.charAt(Math.floor(Math.random() * possibleFigure.length));
    player[0].figure === "X" ?
      player[1].figure = "O" :
      player[1].figure = "X";
    return player;
  };

};

module.exports = Utility;