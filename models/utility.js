"use strict";

const Client = require("../user/client.js");
const Global = require("../server.js");

const playerCount = globalClients => {
  return globalClients.filter(client => client.kind === "player").length;
};

const divideConnections = socket => {
  let player = playerCount(Global.clients);
  let kind = undefined;
  player < 2 ?
    kind = "player" :
    kind = "spectator";
  new Client(socket, kind, player);
};

// class Utility {

//   constructor() {
//     this.playerCount = this.playerCount();
//   }

//   playerCount() {
//     return Global.clients.filter(client => client.kind === "player").length;
//   }

//   divideConnections(socket) {
//     let kind = undefined;
//     this.playerCount < 2 ?
//       kind = "player" :
//       kind = "spectator";
//     new Client(socket, kind, this.playerCount);
//   };

// };

// module.exports = Utility;

module.exports.playerCount = playerCount;
module.exports.divideConnections = divideConnections;