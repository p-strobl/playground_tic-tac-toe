"use strict";

// Express setup
const express = require("express");
const server = express();
server.use(express.static(__dirname + "/public"));

// Socket.io setup
const http = require("http");
const webServer = http.Server(server);
const socketIo = require("socket.io");
const io = socketIo(webServer);

// 
let clients = [];

io.sockets.on("connection", userSocket => {
  console.log(userSocket.id);
  clients.push(userSocket.id);
  console.log(clients);
  console.log(io.engine.clientsCount);

  userSocket.on("disconnect", userSocket => {
    clients.splice(clients.indexOf(userSocket), 1);
    console.log(clients);
    console.log(io.engine.clientsCount);
  });

});

// Start WebSocket-Server
webServer.listen(8083, () => {
  console.log("Server started at port 8083.");
});