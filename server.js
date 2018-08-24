"use strict";

const express = require("express");
const path = require("path");
const http = require("http");
const socketIo = require("socket.io");

const Listener = require("./app/controller/listener.js");

const PORT = 8082;
const server = express();
const webServer = http.Server(server);
const io = socketIo(webServer);

let clients = [];

module.exports.io = io;
module.exports.clients = clients;

class WebServer {
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

new WebServer();
new Listener();