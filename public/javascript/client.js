"use strict";

import {
  clickedFieldCell
} from "./clickedFieldCell.js";

import {
  setClientType,
  // setPlayerSymbol,
  startNewGame,
  updateGameState,
  // setCurrentPlayer,
  // setReadyState,
  // setClientState,
  // setGameState
} from "./utility.js";

import {
  // updateField,
  // setViewHeaderCurrentPlayer,
  setViewFooterStatus
} from "./view.js";

import {
  // messageStatusFooter
} from "./message.js";

export const socket = io.connect();

socket.on("connect", () => {
  socket.on("setClientType", clientType => setClientType(socket, clientType));
  // socket.on("playerSymbol", players => setPlayerSymbol(socket, players));
  socket.on("startGame", newGame => startNewGame(socket, newGame));
  socket.on("updateGame", updatedGame => updateGameState(socket, updatedGame));
  // socket.on("currentPlayer", currentPlayer => setCurrentPlayer(socket, currentPlayer));
  // socket.on("footerStatus", message => setViewFooterStatus(message));
  // socket.on("clientState", clientState => setClientState(socket, clientState));
  // socket.on("clientStatus", status => statusFooter(status));
  // socket.on("gameState", gameState => setGameState(socket, gameState));

  console.log(socket);
  // socket.on("updateField", receivedData => updateField(receivedData));
});

// console.log(socket);

const init = () => {
  clickedFieldCell(socket);
};

init();