"use strict";

const connectedPlayer = require("./connectedPlayer.js");

module.exports.playerRoomLength = function (io, clients) {
  if (clients.length !== 0 && io.sockets.adapter.rooms.hasOwnProperty("player")) {
    return io.sockets.adapter.rooms.player.length;
  } else {
    return 0;
  }
};

module.exports.randomizeSymbol = function (clients) {
  const player = connectedPlayer(clients);
  const possibleSymbol = "XO";
  player[0].symbol = possibleSymbol.charAt(Math.floor(Math.random() * possibleSymbol.length));
  player[0].symbol === "X" ?
    player[1].symbol = "O" :
    player[1].symbol = "X";
  return player;
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