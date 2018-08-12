"use strict";

const express = require("express");
const path = require("path");
const http = require("http");
const socketIo = require("socket.io");

const GameController = require("./app/controllers/controller.js");
const WebServer = require("./app/controllers/web-server.js");

const port = 8082;
const server = express();
const webServer = http.Server(server);
const io = socketIo(webServer);

let clients = [];

module.exports.io = io;
module.exports.clients = clients;

new GameController();
new WebServer(webServer, port, path, server, express);