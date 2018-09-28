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
  getGameFieldCells,
  getHeaderInfoContent,
  getHeaderInfoCurrentPlayer
} from "../helpers/domHelper.js";

export const setClientType = (socket, clientType) => {
  socket.type = clientType;
};

export const startNewGame = (socket, newGame) => {
  socket.gameState = newGame.gameState;
  if (socket.type === "player") {
    setPlayerSymbol(socket, newGame.playerSymbols);
    setViewFooterStatus(newGame.gameState.statusMessage);
  }
  setViewNewGameField();
  setViewHeaderCurrentPlayer(newGame.gameState.currentPlayer);
};

export const updateGameState = (socket, updatedGame) => {
  socket.gameState = updatedGame.gameState;
  setViewUpdateGameField(updatedGame.gameState);
  setViewHeaderCurrentPlayer(updatedGame.gameState.currentPlayer);
  setViewFooterStatus(updatedGame.gameState.statusMessage);
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

export const waitForOpponent = () => {
  setViewResetView();
  setViewFooterStatus("Bitte warten Sie auf Ihren Gegner!");
};