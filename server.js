"use strict";

const express = require("express");
const path = require("path");
const http = require("http");
const socketIo = require("socket.io");

const PORT = 8083;
const server = express();
const webServer = http.Server(server);
const io = socketIo(webServer);

const Utility = require("./app/utility.js");
const Client = require("./app/client.js");
const Emit = require("./app/emit.js")
const Game = require("./GameModule.js");

let clients = [];

module.exports.io = io;
module.exports.clients = clients;

class Server {
  constructor() {
    this.webServer = webServer;
    this.port = PORT;
    this.path = path;
    this.server = server;
    this.express = express;
    this.initRoutes();
    this.start();
  };

  initRoutes() {
    this.server.use(this.express.static(this.path.join(__dirname, "./public")));
  };

  start() {
    this.webServer.listen(this.port, () => {
      const text = "Tic-Tac-Toe server started @port: ";
      const preStart = "[31m[4m[1m";
      const preEnd = "[22m[24m[39m";
      console.log("**************************************");
      console.log(`${text}${preStart}${this.port}${preEnd}`);
      console.log("**************************************");
    });
  };
};

class Listener {
  constructor() {
    this.listen();
  };

  listen() {
    io.sockets.on("connection", socket => {
      const client = new Client(socket);
      const emit = new Emit();
      const game = new Game();

      if (client.type === "player") {
        switch (true) {
          case client.playerRoomLength === 0:
            emit.statusOnePlayer();
            break;
          case client.playerRoomLength >= 1:
            // const game = new Game(new Utility().randomizedStartPlayer());
            game.currentPlayer = new Utility().randomizedStartPlayer();
            emit.playerSymbol();
            emit.statusTwoPlayer();

            // emit.gameState(game);
            // emit.startPlayer(randomizedPlayer);
            // emit.gameStartStatus;
            // game.currentPlayer;

            break;

          default:
        }
      } else if (client.type === "spectator") {
        emit.statusSpectator();
        // emit.currentPlayer(game.currentPlayer);
      }

      socket.on("clickedCell", playerMove => {
        console.log(playerMove);
        game.move(playerMove);
      });
      socket.on("disconnect", () => {
        Utility.removeFromClients(socket);
        if (Utility.playerRoomLength() === 1) {
          emit.statusOnePlayer;
        };
        clients.forEach(client => console.log(client.id + " Disconnected"));
      });
    });
  };
};

new Server();
new Listener();