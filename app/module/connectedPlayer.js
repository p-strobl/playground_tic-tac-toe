'use strict';

const Server = require('../../server.js');

module.exports = function () {
  return Server.clients.filter(client =>
    client.type === 'player');
};