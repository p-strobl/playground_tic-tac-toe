"user strict";

const Server = require("../../server.js");
const Client = require("../module/client.js");
const removeFromClients = require("../module/removeFromClients.js");
const playerRoomLength = require("../module/playerRoomLength.js");
const gameModule = require("../../GameModule.js");

class Listener {
  constructor() {
    this.events();
  }

  events() {
    const game = new gameModule.Game();

    Server.io.sockets.on("connection", socket => {
      new Client(socket);
      console.log("Client connected, cliets.length = " + Server.clients.length);
      if (socket.type === "player" && playerRoomLength() === 1) {
        socket.emit("footerStatus", "Bitte warten Sie auf Ihren Gegner!");
      } else if (socket.type === "player" && playerRoomLength() === 2) {
        game.start();
      } else if (socket.type === "spectator") {
        socket.emit("spectateGame", {
          gameState: game
        });
      }

      socket.on("playerMove", updateGameState => game.move(updateGameState.player, updateGameState.cellId));

      socket.on("disconnect", () => {
        new removeFromClients(socket);
        console.log("Client disconnected, cliets.length = " + Server.clients.length);
      });
    });

  }

};

module.exports = Listener;