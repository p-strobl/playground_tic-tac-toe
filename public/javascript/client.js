"use strict";

import {
  clickedFieldCell,
  userSideGameRestart
} from "./model.js";

import {
  setViewFooterStatus
} from "./view.js";

import {
  setClientType,
  startNewGame,
  setSpectatorState,
  updateGameState,
  waitForOpponent
} from "./controller.js";


const init = () => {
  const socket = io.connect();

  clickedFieldCell(socket);
  userSideGameRestart(socket);

  socket.on("connect", () => {
    socket.on("setClientType", clientType => setClientType(socket, clientType));
    socket.on("waitForOpponent", () => waitForOpponent());
    socket.on("startGame", newGame => startNewGame(socket, newGame));
    socket.on("updateGame", updatedGame => updateGameState(socket, updatedGame));
    socket.on("footerStatus", message => setViewFooterStatus(message));
    socket.on("spectateGame", currentGame => setSpectatorState(socket, currentGame));
  });
};

init();