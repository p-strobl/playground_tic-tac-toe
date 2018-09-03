"use strict";

const express = require("express");
const path = require("path");
const http = require("http");
const socketIo = require("socket.io");

// const Listener = require("./app/controller/listener.js");

const PORT = 8082;
const server = express();
const webServer = http.Server(server);
const io = socketIo(webServer);

const Utility = require("./app/model/utility.js");
const User = require("./app/model/user.js");

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
      new User(socket);
      socket.emit("userType", clients.find(client => client.id === socket.id).type);
      clients.forEach(client => console.log(client.id));
      // if (Utility.playerRoomLength() === 2) {
      //   new Game(new Utility().randomizedStartPlayer());
      // };

      socket.on("disconnect", () => {
        Utility.removeFromClients(socket);
        clients.forEach(client => console.log(client.id));
      });

      socket.on("fieldClicked", data => {
        console.log(data);
      });
    });
  };
};

new Server();
new Listener();