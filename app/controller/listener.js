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

    Server.io.sockets.on("connection", socket => {
      new Client(socket);
      // console.log("Client connected, cliets.length = " + Server.clients.length);

      if (playerRoomLength() === 2) {
        const game = new gameModule.Game();
        // console.table(game);
        game.start();

        socket.on("playerMove", updateGameState => game.move(updateGameState));
        // console.table(game);
      }



      socket.on("disconnect", () => {
        new removeFromClients(socket);
        // console.log("Client disconnected, cliets.length = " + Server.clients.length);
      });
    });

    // io.socket.on("gameStart", gameStart => {

    // });



  }

};

module.exports = Listener;