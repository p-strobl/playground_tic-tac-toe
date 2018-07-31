"use strict";

// Express setup
const express = require("express");
const server = express();
server.use(express.static("public"));

// Socket.io setup
const http = require("http");
const webServer = http.Server(server);
const socketIo = require("socket.io");
const io = socketIo(webServer);

io.sockets.on("connection", userSocket => {
  console.log(userSocket.id);
});

// Start WebSocket-Server
webServer.listen(8083, () => {
  console.log("Server started at port 8083.");
});

