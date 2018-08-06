"use strict";

// Load Express.js
const express = require("express");

// Setup server
const server = express();
const webServer = require("http").Server(server);
const port = 8082;

server.use(express.static(__dirname + "/public"));

// Bind Socket.io to webServer
const io = require("socket.io")(webServer);

// Hold connected clients
let clients = [];

//
const countPlayer = () => clients.filter(element => element.type === "player").length;

//
const joinRoom = (socket, room) => socket.join(room);

//
const roomMessage = (room, message) => io.to(room).emit("message", message);

//
const addToClients = (clientType, clientId) => clients.push({
  type: clientType,
  id: clientId
});

//
const divideClients = socket => {
  if (countPlayer() < 2) {
    addToClients("player", socket.id);
    joinRoom(socket, "player");
    roomMessage("player", "Welcome to player-room.");
  } else {
    addToClients("spectator", socket.id);
    joinRoom(socket, "spectator");
    roomMessage("spectator", "Welcome to specator-room.");
  }
};

//
const removeFromClients = socket => {
  clients = clients.filter(element => element.id !== socket.id);
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
  divideClients(socket);
  // welcomeMessage(io.engine.clientsCount, socket);
  console.log(clients);
  console.log(socket.id);
  console.log(io.engine.clientsCount);

  socket.on("disconnect", () => {
    removeFromClients(socket);
    // welcomeMessage(io.engine.clientsCount, socket);
    console.log(clients);
    console.log(socket.id);
    console.log(io.engine.clientsCount);
  });
});

// Start WebSocket-Server
webServer.listen(port, () => {
  console.log(`Server started at port: ${port}`);
});