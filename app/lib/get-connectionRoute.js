"use strict";

// const playerRoomLength = require("./connectedPlayer.js");

// module.exports.connectionRoute = (io, socket, clients) => {
//   const
//   if (socket.type === "spectator") {
//     return "spectate";
//   } else if (socket.type === "player" && playerRoomLength() === 1) {

//   }
// }
// };

// determineGameStart(socket, game) {
//   if (socket.type === "player" && playerRoomLength() === 1) {
//     socket.emit("waitForOpponent", {
//       status: "Bitte warten Sie auf Ihren Gegner!"
//     });
//   } else if (socket.type === "player" && playerRoomLength() === 2) {
//     game.start();
//   } else if (socket.type === "spectator") {
//     socket.emit("spectateGame", {
//       gameState: game
//     });
//   }
// }