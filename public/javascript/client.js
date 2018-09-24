"use strict";

import {
  clickedFieldCell
} from "./clickedFieldCell.js";

import {
  setClientType,
  // setPlayerSymbol,
  startNewGame,
  updateGameState,
  setSpectatorState,
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
  socket.on("startGame", newGame => startNewGame(socket, newGame));
  socket.on("updateGame", updatedGame => updateGameState(socket, updatedGame));
  socket.on("footerStatus", message => setViewFooterStatus(message));
  socket.on("spectatorState", currentGame => setSpectatorState(socket, currentGame));
});

// console.log(socket);

const init = () => {
  clickedFieldCell(socket);
};

init();