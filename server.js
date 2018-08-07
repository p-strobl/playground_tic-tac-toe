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

// Count Clients player
const countPlayer = () =>
  clients.filter(client => client.type === "player").length;

// Create client class
class Client {
  constructor(socket, type, message) {
    Object.assign(this, {
      socket,
      type,
      message
    });
  };

  static removeFromClients(socket) {
    clients = clients.filter(client => client.id !== socket.id)
  };

  addToClients() {
    clients.push({
      type: this.type,
      id: this.socket.id
    });
  };

  joinRoom() {
    this.socket.join(this.type);
  };

  roomMessage() {
    io.to(this.type).emit("message", this.message);
  };
};

//
const divideClients = socket => {
  if (countPlayer() < 2) {
    var newClient = new Client(socket, "player", "Player-room");
  } else {
    var newClient = new Client(socket, "spectator", "Spectator-room");
  }
  newClient.addToClients();
  newClient.joinRoom();
  newClient.roomMessage();
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
  console.log(io.engine.clientsCount);

  socket.on("disconnect", () => {
    Client.removeFromClients(socket);
    // welcomeMessage(io.engine.clientsCount, socket);
    console.log(clients);
    console.log(io.engine.clientsCount);
  });
});

// Start WebSocket-Server
webServer.listen(port, () => {
  console.log(`Server started at port: ${port}`);
});