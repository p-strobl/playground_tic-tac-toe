"use strict";

import {
  clickedFieldCell
} from "./model.js";

import {
  setViewFooterStatus
} from "./view.js";

import {
  setClientType,
  startNewGame,
  updateGameState,
  setSpectatorState
} from "./controller.js";


const init = () => {
  const socket = io.connect();

  clickedFieldCell(socket);

  socket.on("connect", () => {
    socket.on("setClientType", clientType => setClientType(socket, clientType));
    socket.on("startGame", newGame => startNewGame(socket, newGame));
    socket.on("updateGame", updatedGame => updateGameState(socket, updatedGame));
    socket.on("footerStatus", message => setViewFooterStatus(message));
    socket.on("spectateGame", currentGame => setSpectatorState(socket, currentGame));
  });
};

init();