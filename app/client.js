"use strict";

const Utility = require("./utility.js");
const Global = require("../server.js");

class Client {
  constructor(socket) {
    this.socket = socket;
    this.playerRoomLength = Utility.playerRoomLength();
    this.type = this.divideUser();
    this.addToClients();
    this.joinRoom();
    this.emitClientType();
    // this.emitClientStatus();
  }

  divideUser() {
    return this.playerRoomLength < 2 ?
      "player" :
      "spectator";
  }

  addToClients() {
    this.socket.type = this.type;
    // this.socket.symbol = "";
    Global.clients.push(this.socket);
  }

  joinRoom() {
    this.socket.join(this.type);
  }

  emitClientType() {
    this.socket.emit("clientType", Global.clients.find(client =>
      client.id === this.socket.id).type);
  }

  // emitClientStatus() {
  //   let statusMessage = "";
  //   if (this.type === "player") {
  //     statusMessage = "Bitte warten Sie auf Ihren Gegner!";
  //   } else {
  //     statusMessage = "Sorry, es waren bereits genug Spieler online.";
  //   }
  //   this.socket.emit("clientStatus", statusMessage);
  // }
};

module.exports = Client;