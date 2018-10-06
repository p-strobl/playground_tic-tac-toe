"use strict";

import {
  setViewHeaderPlayerSymbol,
  setViewHeaderCurrentPlayer,
  setViewFooterStatus,
  setViewNewGameField,
  setViewUpdateGameField,
  setViewSpectatorGameField,
  setViewSpectatorStatus,
  setViewResetView,
  setViewHideResetButton,
  setViewShowResetButton
} from "./view.js";

import {
  getGameFields,
  getHeaderInfoContent,
  getHeaderInfoCurrentPlayer,
} from "../helpers/domHelper.js";

export const setClientType = (socket, clientType) => {;
  socket.type = clientType;
};

export const startNewGame = (socket, newGame) => {
  socket.game = newGame.game;
  if (socket.type === "player") {
    setPlayerSymbol(socket, newGame.playerSymbols);
    setViewFooterStatus(newGame.game.status);
  }
  // setViewNewGameField(newGame.game.gameField);
  setViewHeaderCurrentPlayer(newGame.game.currentPlayer);
  setViewHideResetButton();
};

const setPlayerSymbol = (socket, players) => {
  socket.symbol = players.find(player => player.id === socket.id).symbol;
  setViewHeaderPlayerSymbol(socket.symbol);
};

export const updateGameState = (socket, updatedGame) => {
  if (updatedGame.valid) {
    socket.game = updatedGame;
    setViewUpdateGameField(updatedGame);
    setViewHeaderCurrentPlayer(updatedGame.currentPlayer);
    if (updatedGame.result !== "") setViewShowResetButton(socket);
  }
  setViewFooterStatus(updatedGame.status);
};

export const setSpectatorState = (socket, currentGame) => {
  socket.game = currentGame.game;
  setViewHeaderCurrentPlayer(currentGame.game.currentPlayer);
  setViewSpectatorGameField(currentGame.game);
  setViewSpectatorStatus(currentGame.status);
};

export const setWaitForOpponent = message => {
  setViewResetView();
  setViewFooterStatus(message);
};