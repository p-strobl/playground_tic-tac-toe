"use strict";

import {
  setViewHeaderPlayerSymbol,
  setViewHeaderCurrentPlayer,
  setViewFooterStatus,
  setViewNewGameField,
  setViewUpdateGameField,
  setViewSpectatorGameField,
  setViewSpectatorStatus,
  setViewResetView
} from "./view.js";

import {
  getGameFields,
  getHeaderInfoContent,
  getHeaderInfoCurrentPlayer
} from "../helpers/domHelper.js";

import {
  determineStatusMessage
} from "./model.js"

export const setClientType = (socket, clientType) => {
  socket.type = clientType;
};

export const startNewGame = (socket, newGame) => {
  socket.gameState = newGame.gameState;
  if (socket.type === "player") {
    setPlayerSymbol(socket, newGame.playerSymbols);
    setViewFooterStatus(determineStatusMessage(newGame.gameState));
  }
  setViewNewGameField();
  setViewHeaderCurrentPlayer(newGame.gameState.currentPlayer);
};

export const updateGameState = (socket, updatedGame) => {
  socket.gameState = updatedGame;
  setViewUpdateGameField(updatedGame);
  setViewHeaderCurrentPlayer(updatedGame.currentPlayer);
  setViewFooterStatus(determineStatusMessage(updatedGame));
};

export const setSpectatorState = (socket, currentGame) => {
  socket.gameState = currentGame.gameState;
  setViewSpectatorGameField(currentGame.gameState);
  setViewSpectatorStatus();
  setViewHeaderCurrentPlayer(currentGame.gameState.currentPlayer);
};

const setPlayerSymbol = (socket, players) => {
  socket.symbol = players.find(player => player.id === socket.id).symbol;
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

export const setGameState = (socket, gameState) => {
  socket.currentPlayer = gameState.currentPlayer;
  socket.gameField = gameState.gameField;
  setViewUpdateField(gameState);
};

export const setWaitForOpponent = gameState => {
  setViewResetView();
  setViewFooterStatus(determineStatusMessage(gameState));
};