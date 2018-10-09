"use strict";
//@ts-check

/**
 * Count's connected clients in player room
 * @function playerRoomCount
 * @param   {Object} io      Global io object
 * @param   {Array}  clients Global client array
 * @returns {Number} How many player are connected
 */
module.exports.playerRoomCount = function (io, clients) {
  if (clients.length !== 0 && io.sockets.adapter.rooms.hasOwnProperty("player")) {
    return io.sockets.adapter.rooms.player.length;
  } else {
    return 0;
  }
};

/**
 * Gives connected payer randomized symbols
 * @function randomizeSymbol
 * @param   {Array}  clients Global client array
 * @returns {Object} Player with randomized symbols
 */
module.exports.randomizeSymbol = function (clients) {
  const players = clients.filter(client => client.type === "player");
  const possibleSymbol = "XO";
  players[0].symbol = possibleSymbol.charAt(Math.floor(Math.random() * possibleSymbol.length));
  players[0].symbol === "X" ?
    players[1].symbol = "O" :
    players[1].symbol = "X";
  return players;
};

/**
 * Get clients with type player
 * @function getPlayerSymbols
 * @param   {Object} randomizedSymbols Player with randomized symbols
 * @returns {Object} Player id and symbol
 */
module.exports.getPlayerSymbols = function (randomizedSymbols) {
  return Object.values(randomizedSymbols).map(player => {
    return {
      id: player.id,
      symbol: player.symbol
    };
  });
};

/**
 * Randomize wihch player startes
 * @function randomizeStartPlayer
 * @param   {Object} randomizedSymbol Player with randomized symbols
 * @returns {String} Random start player
 */
module.exports.randomizeStartPlayer = function (randomizedSymbol) {
  return randomizedSymbol[Math.floor(Math.random() * randomizedSymbol.length)].symbol;
};

/**
 * Removes disconnected client from global clients array
 * @function removeClient
 * @param   {Object} socket  Clients socket object
 * @param   {Array}  clients Global client array
 * @returns {Array} Remaining clients
 */
module.exports.removeClient = function (socket, clients) {
  return clients.filter(client => client.id !== socket.id);
};