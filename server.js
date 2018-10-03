"use strict";

const express = require("express");
const path = require("path");
const http = require("http");
const socketIo = require("socket.io");

const PORT = 8083;
const server = express();
const webServer = http.Server(server);
const io = socketIo(webServer);

const Client = require("./app/lib/Client.js");
const utilities = require("./app/lib/utilities.js");
const gameModule = require("./GameModule.js");

const game = new gameModule.Game();
let clients = [];

io.sockets.on("connection", socket => {
  const client = new Client(io, socket, clients);
  clients.push(client);
  socket.emit("setClientType", client.type);

  if (client.type === "player" && utilities.playerRoomLength(io, clients) === 1) {
    socket.emit("waitForOpponent", "Bitte warten Sie auf Ihren Gegner!");

  } else if (client.type === "player" && utilities.playerRoomLength(io, clients) === 2) {
    let playerSymbols = game.start(clients);
    io.sockets.in("player").emit("startGame", {
      game,
      playerSymbols
    });

  } else {
    socket.emit("spectateGame", game);
  }

  socket.on("playerMove", clicked => {
    const move = game.move(clicked.player, clicked.fieldId);
    if (move === "") {
      io.emit("updateGame", game);

    } else {
      socket.emit("updateGame", game);
    }
  });

  socket.on("userSideGameRestart", () => {
    console.log(utilities.playerRoomLength(io, clients));
    if (utilities.playerRoomLength(io, clients) === 2) {
      let playerSymbols = game.start(clients);
      io.sockets.in("player").emit("startGame", {
        game,
        playerSymbols
      });

    } else {
      socket.emit('waitForOpponent', {
        status: 'Bitte warten Sie auf Ihren Gegner!'
      });
    }
  });

  socket.on("disconnect", () => {
    clients = utilities.removeClient(socket, clients);
  });
});

class Server {
  constructor() {
    this.webServer = webServer;
    this.PORT = PORT;
    this.path = path;
    this.server = server;
    this.express = express;
    this.initRoutes(server, express, path);
    this.start(webServer, PORT);
  };

  initRoutes() {
    this.server.use(this.express.static(this.path.join(__dirname, "./public")));
  };

  start() {
    this.webServer.listen(this.PORT, () => {
      const text = "Tic-Tac-Toe server started @port: ";
      const preStart = "[31m[4m[1m";
      const preEnd = "[22m[24m[39m";
      console.log("**************************************");
      console.log(`${text}${preStart}${this.PORT}${preEnd}`);
      console.log("**************************************");
    });
  };
};

new Server();