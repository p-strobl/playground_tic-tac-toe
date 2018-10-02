'use strict';

import {
  determineClickedField,
  userSideGameRestart
} from './model.js';

import {
  setViewFooterStatus
} from './view.js';

import {
  setClientType,
  startNewGame,
  updateGameState,
  setSpectatorState,
  setWaitForOpponent
} from './controller.js';

const init = () => {
  const socket = io.connect();

  determineClickedField(socket);
  userSideGameRestart(socket);

  socket.on('connect', () => {
    socket.on('setClientType', clientType => setClientType(socket, clientType));
    socket.on('waitForOpponent', message => setWaitForOpponent(message));
    socket.on('startGame', newGame => startNewGame(socket, newGame));
    socket.on('updateGame', updatedGame => updateGameState(socket, updatedGame));
    socket.on('spectateGame', currentGame => setSpectatorState(socket, currentGame));
  });
};

init();