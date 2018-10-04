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

const init = () => {

  const addNewClient = (socket, clients, newClient) => {
    clients.push(newClient);
    socket.emit("setClientType", newClient.type);
    return newClient.type;
  };

  const waitForOpponent = io => {
    utilities.playerRoomCount(io, clients) === 1 ?
      io.sockets.in("player").emit("waitForOpponent", "Bitte warten Sie auf Ihren Gegner!") :
      "";
  };

  const startGame = (game, clients) => {
    return io.sockets.in("player").emit("startGame", game.start(clients));
  };

  const spactateGame = (socket, game) => {
    return socket.emit("spectateGame", {
      game,
      status: {
        header: "Sie befinden sich im Zuschauer-Modus!",
        footer: "Sorry, es waren bereits genug Spieler online."
      }
    });
  };

  const playerMove = (io, socket, clicked) => {
    clicked.type === "spectator" ? clicked.player = clicked.type : "";
    game.move(clicked.player, clicked.fieldId) === "" ?
      io.emit("updateGame", game) :
      socket.emit("updateGame", game);
  };

  const userSideGameRestart = (io, socket, clients, game) => {
    utilities.playerRoomCount(io, clients) === 2 ?
      startGame(game, clients) :
      waitForOpponent(io);
  };

  io.sockets.on("connection", socket => {
    const newClient = new Client(io, socket, clients);
    const newClientType = addNewClient(socket, clients, newClient);
    const playerRoomCount = utilities.playerRoomCount(io, clients);

    if (newClientType === "player" && playerRoomCount === 1) {
      waitForOpponent(io);
    } else if (newClientType === "player" && playerRoomCount === 2) {
      startGame(game, clients);
    } else {
      spactateGame(socket, game);
    }

    socket.on("playerMove", clicked => {
      playerMove(io, socket, clicked);
    });

    socket.on("userSideGameRestart", () => {
      userSideGameRestart(io, socket, clients, game);
    });

    socket.on("disconnect", () => {
      clients = utilities.removeClient(socket, clients);
      waitForOpponent(io);
    });
  });

};

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
init();