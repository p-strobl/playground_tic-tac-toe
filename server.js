"use strict";

// Load Express.js
const express = require("express");

// Setup server
const server = express();
const webServer = require("http").Server(server);

server.use(express.static(__dirname + "/public"));

// Bind Socket.io to webServer
const io = require("socket.io")(webServer);

// Hold connected clients
let clients = {
  player: [],
  spectator: []
};

//
const addToClients = socket => {
  if (clients.player.length <= 1) {
    clients.player.push(socket.id);
    socket.join("player");
    io.to("player").emit("message", "player-room");
  } else {
    clients.spectator.push(socket.id);
    socket.join("spectator");
    io.to("spectator").emit("message", "spectator-room");
  }
};

//
const removeFromClients = socket => {
  Object.values(clients).forEach(value => {
    value.splice(value.indexOf(socket.id), 1);
  });
};

// 
const welcomeMessage = (clientCount, socket) => {
  switch (true) {
    case clientCount === 1:
      socket.send("Bitte warten Sie auf Ihren gegner!");
      // getFooterStatusContent.innerHTML = "Bitte warten Sie auf Ihren gegner!";
      break;
    case clientCount === 2:
      socket.send("Zwei Spieler verbunden. Spiel kann beginnen!");

      // getFooterStatusContent.innerHTML = "Zwei Spieler verbunden. Spiel kann beginnen!";
      break;
    case clientCount > 2:
      socket.send("Es sind bereits zwei Spieler verbunden, bitte versuchen Sie es später noch ein mal.");

      // getFooterStatusContent.innerHTML = "Es sind bereits zwei Spieler verbunden, bitte versuchen Sie es später noch ein mal.";
      break;
    default:
  }
};

io.sockets.on("connection", socket => {
  // console.log(socket.id);
  // clients.push(socket.id); 
  addToClients(socket);
  // welcomeMessage(io.engine.clientsCount, socket);
  // io.emit("clientCount", io.engine.clientsCount);
  console.log(clients);
  console.log(io.engine.clientsCount);


  socket.on("disconnect", socket => {
    removeFromClients(socket);
    // clients.splice(clients.indexOf(socket), 1);
    // welcomeMessage(io.engine.clientsCount, socket);

    // io.emit("clientCount", io.engine.clientsCount);
    console.log(clients);
    console.log(io.engine.clientsCount);
  });
});

// Start WebSocket-Server
webServer.listen(8083, () => {
  console.log("Server started at port 8083.");
});