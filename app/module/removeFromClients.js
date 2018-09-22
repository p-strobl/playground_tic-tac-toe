"use strict";
const Server = require("../../server.js");

module.exports = function (socket) {
  Server.clients = Server.clients.filter(client => client.id !== socket.id);
};