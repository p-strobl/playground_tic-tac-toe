"use strict";

// Load require
const express = require("express");
const path = require("path");
const http = require("http");
const socketIo = require("socket.io");

const Client = require("./user/client.js");
const Utility = require("./models/utility.js");

// Setup server
const port = 8082;
const server = express();
const webServer = http.Server(server);
const io = socketIo(webServer);

let clients = [];

module.exports.io = io;
module.exports.clients = clients;

// Server class
class WebServer {
  constructor() {
    this.initRoutes();
    this.start();
  }

  start() {
    webServer.listen(port, () =>
      console.log(`Server started at port: ${port}`));
  }

  initRoutes() {
    server.use(express.static(path.join(__dirname, "public")));
  }
};

// Socket connecting
io.sockets.on("connection", socket => {
  new Utility(socket).divideClients();
  console.log(clients);
  console.log(io.engine.clientsCount);

  // Socket disconnecting
  socket.on("disconnect", () => {
    clients = Client.removeFromClients(socket, clients);
    console.log(clients);
    console.log(io.engine.clientsCount);
  });
});

// Start new server
new WebServer();