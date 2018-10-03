"use strict";
// const Server = require("../../server.js");

// module.exports = function (socket) {
//   Server.clients = Server.clients.filter(client => client.id !== socket.id);
// };

const removeClient = (socket, clients) => {
  return clients.filter(client => client.id !== socket.id);
};

module.exports = removeClient;