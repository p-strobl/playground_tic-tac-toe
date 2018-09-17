"use strict";

import {
  setViewHeaderPlayerSymbol,
  setViewHeaderCurrentPlayer,
  setViewUpdateField,
  // setViewFooterStatus
} from "./view.js";

export const setClientType = (socket, clientType) => {
  socket.type = clientType;
};

export const setPlayerSymbol = (socket, player) => {
  socket.symbol = player.find(player => player.id === socket.id).symbol;
  setViewHeaderPlayerSymbol(socket.symbol);
};

export const setStartPlayer = (socket, startPlayer) => {
  socket.startPlayer = startPlayer;
  setCurrentPlayer(socket, startPlayer);
};

export const setCurrentPlayer = (socket, currentPlayer) => {
  socket.currentPlayer = currentPlayer;
  setViewHeaderCurrentPlayer(socket.startPlayer);
};

// export const setFooterStatus = message => {
//   setViewFooter(message);
// };



export const setClientState = (socket, clientState) => {

};

export const setGameState = (socket, gameState) => {
  socket.currentPlayer = gameState.currentPlayer;
  socket.fieldState = gameState.fieldState;

  setViewUpdateField(gameState);

  console.log(gameState);
};