"use strict";
//@ts-check

/**
 * Count's connected clients in player room
 * @function playerRoomCount
 * @param   {Object} io      Global io object
 * @param   {Array}  clients Global client array
 * @returns {Number} How many player are connected
 */
module.exports.playerRoomCount = (io, clients) => {
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
module.exports.randomizeSymbol = clients => {
  const players = clients.filter(client => client.type === "player");
  const possibleSymbol = "XO";
  players[0].symbol = possibleSymbol.charAt(Math.floor(Math.random() * possibleSymbol.length));
  players[1].symbol = players[0].symbol === "X" ? "O" : "X";
  return players;
};

/**
 * Get clients with type player
 * @function getPlayerSymbols
 * @param   {Object} randomizedSymbols Player with randomized symbols
 * @returns {Object} Player id and symbol
 */
module.exports.getPlayerSymbols = (randomizedSymbols) => {
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
module.exports.randomizeStartPlayer = randomizedSymbol => {
  return randomizedSymbol[Math.floor(Math.random() * randomizedSymbol.length)].symbol;
};

/**
 * Removes disconnected client from global clients array
 * @function removeClient
 * @param   {Object} socket  Clients socket object
 * @param   {Array}  clients Global client array
 * @returns {Array} Remaining clients
 */
module.exports.removeClient = (socket, clients) => {
  return clients.filter(client => client.id !== socket.id);
};