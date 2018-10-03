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
  determineEndGameMessage
} from "./model.js"

export const setClientType = (socket, clientType) => {;
  socket.type = clientType;
};

export const startNewGame = (socket, newGame) => {
  socket.gameState = newGame.gameState;
  if (socket.type === "player") {
    setPlayerSymbol(socket, newGame.playerSymbols);
    setViewFooterStatus(newGame.gameState.status);
  }
  setViewNewGameField();
  setViewHeaderCurrentPlayer(newGame.gameState.currentPlayer);
};

export const updateGameState = (socket, updatedGame) => {
  console.log(updatedGame);
  if (updatedGame.valid) {
    socket.gameState = updatedGame;
    setViewUpdateGameField(updatedGame);
    setViewHeaderCurrentPlayer(updatedGame.currentPlayer);
    if (updatedGame.result !== "") {
      setViewFooterStatus(determineEndGameMessage(updatedGame));
    }
  } else {
    setViewFooterStatus(updatedGame.status);
  }
};

export const setSpectatorState = (socket, currentGame) => {
  socket.gameState = currentGame.gameState;
  setViewHideResetButton();
  setViewHeaderCurrentPlayer(currentGame.gameState.currentPlayer);
  setViewSpectatorGameField(currentGame.gameState);
  setViewSpectatorStatus();
};

const setPlayerSymbol = (socket, players) => {
  socket.symbol = players.find(player => player.id === socket.id).symbol;
  setViewHeaderPlayerSymbol(socket.symbol);
  console.log("Socket symbol", socket.symbol);
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
  setViewFooterStatus(message.status);
};