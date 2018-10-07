"use strict";
//@ts-check

// Require Express.js
const express = require("express");
const path = require("path");
const http = require("http");

// Require socket.io
const socketIo = require("socket.io");

// Set port number
const PORT = 8083;

// init server
const server = express();
const webServer = http.Server(server);

// init io
const io = socketIo(webServer);

// Require Client class
const Client = require("./app/lib/Client.js");

// Require utilitiy functions
const utilities = require("./app/lib/utilities.js");

// Require Game class
const gameModule = require("./GameModule.js");

// init new Game modul
const game = new gameModule.Game();

// init global Clients array
let clients = [];

const init = () => {

  /**
   * @function addNewClient     Add's new client to clients array and send's him/her his/her defined type.
   * @param  {Object} socket      Clients socket object
   * @param  {Array} clients     Global clients array
   * @param  {Object} newClient   New Client with defined type and set room
   * @returns {String}          What kind of type the new client have.
   */
  const addNewClient = (socket, clients, newClient) => {
    clients.push(newClient);
    socket.emit("setClientType", newClient.type);
    return newClient.type;
  };

  /**
   * @function waitForOpponent  Send's please wait message to waiting player.
   * @param  {Object} io        Global io object
   * @returns {emit}            Emit string
   */
  const waitForOpponent = io => {
    utilities.playerRoomCount(io, clients) === 1 ?
      io.sockets.in("player").emit("waitForOpponent", "Bitte warten Sie auf Ihren Gegner!") :
      "";
  };

  /**
   * @function startGame
   * @param  {Object} game    Game module
   * @param  {Array} clients  Global array
   * @returns {emit}          Emit new game to all players in room "player"
   */
  const startGame = (game, clients) => {
    io.sockets.in("player").emit("startGame", game.start(clients));
  };

  /**
   * @function spactateGame
   * @param  {Object} io    Global io object
   * @param  {Object} game  Game module
   * @returns {emit}        Emit game object and header / footer status message
   */
  const spactateGame = (io, game) => {
    io.sockets.in("spectator").emit("spectateGame", {
      game,
      status: {
        header: "Sie befinden sich im Zuschauer-Modus!",
        footer: "Sorry, es waren bereits genug Spieler online."
      }
    });
  };

  /**
   * @function playerMove
   * @param  {Object} io      Global io object
   * @param  {Object} socket  Clients socket object
   * @param  {Object} clicked What player and what field got clicked
   * @returns {emit}          Emits move to all player or the error message to the single player who clicked
   */
  const playerMove = (io, socket, clicked) => {
    clicked.type === "spectator" ? clicked.player = clicked.type : "";
    game.move(clicked.player, clicked.fieldId) === "" ?
      io.emit("updateGame", game) :
      socket.emit("updateGame", game);
  };

  /**
   * @function userSideGameRestart  Determine if a new game should start / a single player should wait / to spactate the current game
   * @param  {Object} io            Global io object
   * @param  {Array} clients        Global array
   * @param  {Object} game          Game module
   */
  const userSideGameRestart = (io, clients, game) => {
    utilities.playerRoomCount(io, clients) === 2 ?
      startGame(game, clients) :
      waitForOpponent(io);
    spactateGame(io, game);
  };

  // On socket connection
  io.sockets.on("connection", socket => {
    const newClient = new Client(io, socket, clients);
    const newClientType = addNewClient(socket, clients, newClient);
    const playerRoomCount = utilities.playerRoomCount(io, clients);

    if (newClientType === "player" && playerRoomCount === 1) {
      waitForOpponent(io);
    } else if (newClientType === "player" && playerRoomCount === 2) {
      startGame(game, clients);
    } else {
      spactateGame(io, game);
    }

    // Player makes a move
    socket.on("playerMove", clicked => {
      playerMove(io, socket, clicked);
    });

    // Player restartes the game
    socket.on("userSideGameRestart", () => {
      userSideGameRestart(io, clients, game);
    });

    // Client disconnectes
    socket.on("disconnect", () => {
      clients = utilities.removeClient(socket, clients);
      waitForOpponent(io);
    });
  });

};

/** Class creating new Server  */
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