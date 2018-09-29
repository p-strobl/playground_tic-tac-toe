"user strict";

const Server = require("../../server.js");
const Client = require("../module/newClient.js");
const removeFromClients = require("../module/removeFromClients.js");
const playerRoomLength = require("../module/playerRoomLength.js");
const gModule = require("../../GameModule.js");

class Listener {
  constructor() {
    this.events();
  }

  events() {
    const game = new gModule.Game();

    Server.io.sockets.on("connection", socket => {

      new Client(socket);
      determineGameStart(socket, game);
      console.log("Client connected, cliets.length = " + Server.clients.length);

      socket.on("playerMove", updateGameState => game.move(updateGameState.player, updateGameState.fieldId));
      socket.on("userSideGameRestart", () => userSideGameRestart(socket, game));

      socket.on("disconnect", () => {
        new removeFromClients(socket);
        console.log("Client disconnected, cliets.length = " + Server.clients.length);
      });
    });

  }

};

module.exports = Listener;

const determineGameStart = (socket, game) => {
  if (socket.type === "player" && playerRoomLength() === 1) {
    socket.emit("waitForOpponent", {
      status: "wait"
    });
  } else if (socket.type === "player" && playerRoomLength() === 2) {
    game.start();
  } else if (socket.type === "spectator") {
    socket.emit("spectateGame", {
      gameState: game
    });
  }
};

const userSideGameRestart = (socket, game) => {
  if (playerRoomLength() === 2) {
    game.start();
  } else {
    socket.emit("waitForOpponent", {
      status: "wait"
    });
  }
};