"use strict";

import {
  setViewHeaderPlayerSymbol,
  setViewHeaderCurrentPlayer,
  setViewUpdateField,
  setViewFooterStatus
} from "./view.js";

const setClientStatus = (type, playerCount) => {
  const status = {
    player: {
      one: "Bitte warten Sie auf Ihren Gegner!",
      two: "Zwei Spieler verbunden. Spiel kann beginnen!"
    },
    spectator: {
      all: "Sorry, es waren bereits genug Spieler online."
    }
  };
  if (type === "player" && playerCount === 0) {
    setViewFooterStatus(status.player.one);
  } else if (type === "player" && playerCount === 1) {
    setViewFooterStatus(status.player.two);
  } else if (type === "spectator") {
    setViewFooterStatus(spectator.all);
  }
};

export const setClientType = (socket, clientType) => {
  socket.type = clientType;
};

export const setPlayerSymbol = (socket, player) => {
  socket.symbol = player.find(player => player.id === socket.id).symbol;
  console.log(socket);
  setViewHeaderPlayerSymbol(socket.symbol);
};

export const setStartPlayer = (socket, startPlayer) => {
  socket.startPlayer = startPlayer;
  setCurrentPlayer(socket, startPlayer);
};

export const setCurrentPlayer = (socket, currentPlayer) => {
  socket.currentPlayer = currentPlayer;
  setViewHeaderCurrentPlayer(currentPlayer);
};

// export const setFooterStatus = message => {
//   setViewFooter(message);
// };



// export const setClientState = (socket, clientState) => {

// };

export const setGameState = (socket, gameState) => {
  console.log(socket);
  socket.currentPlayer = gameState.currentPlayer;
  socket.gameField = gameState.gameField;
  setViewUpdateField(gameState);
  console.log(socket);
};