"use strict";

const Utility = require("./utility.js");
const Server = require("../../server.js");
const playerRoomLength = require("./playerRoomLength.js");
// const Global = require("../server.js");

class Client {
  constructor(socket) {
    this.socket = socket;
    // this.playerRoomLength = playerRoomLength();
    this.type = this.defineType();
    this.addToClients();
    this.joinRoom();
    this.emitClientType();
    // this.emitReadyState();
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

  // emitReadyState() {
  //   let readyState = false;
  //   console.log(playerRoomLength());
  //   if (playerRoomLength() === 2) {
  //     readyState = true;
  //   }
  //   Server.io.emit("readyState", {
  //     gameReady: readyState
  //   });
  // }
};

module.exports = Client;

// class Client {
//   constructor(socket, clients, io) {
//     this.socket = socket;
//     this.clients = clients;
//     this.playerRoomLength = Utility.playerRoomLength(clients, io);
//     this.type = this.divideUser();
//     this.addToClients();
//     this.joinRoom();
//     this.emitClientType();
//     // this.emitClientStatus();
//   }

//   divideUser() {
//     return this.playerRoomLength < 2 ?
//       "player" :
//       "spectator";
//   }

//   addToClients() {
//     this.socket.type = this.type;
//     this.clients.push(this.socket);
//   }

//   joinRoom() {
//     this.socket.join(this.type);
//   }

//   emitClientType() {
//     this.socket.emit("clientType", this.clients.find(client =>
//       client.id === this.socket.id).type);
//   }
// };

// module.exports = Client;