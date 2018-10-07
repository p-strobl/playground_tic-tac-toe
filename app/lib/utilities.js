"use strict";
//@ts-check

module.exports.playerRoomCount = function (io, clients) {
  if (clients.length !== 0 && io.sockets.adapter.rooms.hasOwnProperty("player")) {
    return io.sockets.adapter.rooms.player.length;
  } else {
    return 0;
  }
};

module.exports.randomizeSymbol = function (clients) {
  const players = clients.filter(client => client.type === "player");
  const possibleSymbol = "XO";
  players[0].symbol = possibleSymbol.charAt(Math.floor(Math.random() * possibleSymbol.length));
  players[0].symbol === "X" ?
    players[1].symbol = "O" :
    players[1].symbol = "X";
  return players;
};

module.exports.getPlayerSymbols = function (randomizedSymbols) {
  return Object.values(randomizedSymbols).map(player => {
    return {
      id: player.id,
      symbol: player.symbol
    };
  });
};

module.exports.randomizeStartPlayer = function (randomizedSymbol) {
  return randomizedSymbol[Math.floor(Math.random() * randomizedSymbol.length)].symbol;
};

module.exports.removeClient = function (socket, clients) {
  return clients.filter(client => client.id !== socket.id);
};