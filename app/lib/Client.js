// "use strict";

// const Server = require("../../server.js");
// const playerRoomLength = require("./playerRoomLength.js");

// class Client {
//   constructor(socket) {
//     this.socket = socket;
//     this.type = this.defineType();
//     this.addToClients();
//     this.joinRoom();
//     this.emitClientType();
//   }

//   defineType() {
//     return playerRoomLength() < 2 ?
//       "player" :
//       "spectator";
//   }

//   addToClients() {
//     this.socket.type = this.type;
//     Server.clients.push(this.socket);
//   }

//   joinRoom() {
//     this.socket.join(this.type);
//   }

//   emitClientType() {
//     this.socket.emit("setClientType", Server.clients.find(client =>
//       client.id === this.socket.id).type);
//   }

// };

// module.exports = Client;

"use strict";

const utility = require("./utilities.js");

class Client {
  constructor(io, socket, clients) {
    this.id = socket.id;
    this.type = this.defineType(io, socket, clients);
  }

  defineType(io, socket, clients) {
    const type = utility.playerRoomLength(io, clients) < 2 ?
      "player" :
      "spectator";
    socket.join(type);
    return type;
  }
};

module.exports = Client;