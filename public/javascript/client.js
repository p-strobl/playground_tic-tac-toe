"use strict";


import {
  determineClickedField,
  userSideGameRestart
} from "./gameModel.js";

import {
  setClientType,
  startNewGame,
  updateGameState,
  setSpectatorState,
  setWaitForOpponent
} from "./gameController.js";

const init = () => {
  const socket = io.connect();

  determineClickedField(socket);
  userSideGameRestart(socket);

  // Listen for server events
  socket.on("connect", () => {
    socket.on("setClientType", clientType => setClientType(socket, clientType));
    socket.on("waitForOpponent", message => setWaitForOpponent(message));
    socket.on("startGame", newGame => startNewGame(socket, newGame));
    socket.on("updateGame", updatedGame => updateGameState(socket, updatedGame));
    socket.on("spectateGame", currentGame => setSpectatorState(socket, currentGame));
  });
};

init();