"use strict";

const Server = require("../../server.js");

module.exports = function connectedPlayer(clients) {
  return clients.filter(client =>
    client.type === "player");
};