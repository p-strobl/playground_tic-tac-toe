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

// Start WebSocket-Server
webServer.listen(8083, () => {
  console.log("Server started at port 8083.");
});

//
const divideClients = (socket, clientCount) => {
  switch (true) {
    case clientCount < 2:
      clients.player.push(socket.id);
      break;
    case clientCount > 2:
      clients.spectator.push(socket.id);
      break;
    default:
  }
};


const clientDisconnects = socket => {
  return clients.filter(clientId => clientId === socket.id);
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

io.on("connection", socket => {
  // console.log(socket.id);
  // clients.push(socket.id);
  divideClients(socket, io.engine.clientsCount);
  // welcomeMessage(io.engine.clientsCount, socket);
  // io.emit("clientCount", io.engine.clientsCount);
  console.log(clients);
  console.log(io.engine.clientsCount);

  socket.on("disconnect", socket => {
    clientDisconnects(socket);
    // clients.splice(clients.indexOf(socket), 1);
    // welcomeMessage(io.engine.clientsCount, socket);

    // io.emit("clientCount", io.engine.clientsCount);
    console.log(clients);
    console.log(io.engine.clientsCount);
  });
});