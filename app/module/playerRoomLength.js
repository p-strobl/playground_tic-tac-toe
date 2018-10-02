'use strict';
const Server = require('../../server.js');

module.exports = function () {
  if (Server.clients.length !== 0 && Server.io.sockets.adapter.rooms.hasOwnProperty('player')) {
    return Server.io.sockets.adapter.rooms.player.length;
  } else {
    return 0;
  }
};