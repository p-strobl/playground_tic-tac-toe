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
  setViewHideResetButton
} from "./view.js";

import {
  getGameFields,
  getHeaderInfoContent,
  getHeaderInfoCurrentPlayer,
} from "../helpers/domHelper.js";

import {
  // determineEndGameMessage
} from "./model.js"

export const setClientType = (socket, clientType) => {;
  socket.type = clientType;
  // console.log("Socket", socket);
};

export const startNewGame = (socket, newGame) => {
  // console.log(newGame);
  socket.game = newGame.game;
  if (socket.type === "player") {
    setPlayerSymbol(socket, newGame.playerSymbols);
    setViewFooterStatus(newGame.game.status);
  }
  setViewNewGameField();
  setViewHeaderCurrentPlayer(newGame.game.currentPlayer);
  console.log(socket.game);
};

export const updateGameState = (socket, updatedGame) => {
  if (updatedGame.valid) {
    socket.game = updatedGame;
    setViewUpdateGameField(updatedGame);
    setViewHeaderCurrentPlayer(updatedGame.currentPlayer);
  }
  setViewFooterStatus(updatedGame.status);
  console.log("GameUpdate", updatedGame);
};

export const setSpectatorState = (socket, currentGame) => {
  socket.game = currentGame;
  setViewHideResetButton();
  setViewHeaderCurrentPlayer(currentGame.currentPlayer);
  setViewSpectatorGameField(currentGame);
  setViewSpectatorStatus();
};

const setPlayerSymbol = (socket, players) => {
  socket.symbol = players.find(player => player.id === socket.id).symbol;
  setViewHeaderPlayerSymbol(socket.symbol);
  // console.log("Socket symbol", socket.symbol);
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

export const setWaitForOpponent = message => {
  setViewResetView();
  setViewFooterStatus(message);
};