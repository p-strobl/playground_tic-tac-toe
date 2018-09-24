"use strict";

import {
  setViewHeaderPlayerSymbol,
  setViewHeaderCurrentPlayer,
  setViewFooterStatus,
  setViewNewGameField,
  setViewUpdateGameField,
  setViewSpectatorGameField
} from "./view.js";

export const setClientType = (socket, clientType) => {
  socket.type = clientType;
};

export const startNewGame = (socket, newGame) => {
  // console.log(game);
  socket.gameState = newGame.gameState;
  if (socket.type === "player") {
    setPlayerSymbol(socket, newGame.playerSymbols);
    setViewFooterStatus(newGame.statusMessage);
  }
  setViewNewGameField();
  setViewHeaderCurrentPlayer(newGame.gameState.currentPlayer);
  // console.log(socket);
  // console.log(socket);
  // setViewFooterStatus(socket.type, readyState.gameReady);
};

export const updateGameState = (socket, updatedGame) => {
  // console.log(updatedGame);
  socket.gameState = updatedGame.gameState;
  setViewUpdateGameField(updatedGame.gameState);
  setViewHeaderCurrentPlayer(updatedGame.gameState.currentPlayer);
  console.log(socket.gameState.gameField);
  console.log(socket.gameState);
};

export const setSpectatorState = (socket, currentGame) => {
  socket.gameState = currentGame.gameState;
  setViewSpectatorGameField(currentGame.gameState);
  setViewHeaderCurrentPlayer(currentGame.gameState.currentPlayer);
  setViewFooterStatus(currentGame.message);
};

const setPlayerSymbol = (socket, players) => {
  socket.symbol = players.find(player => player.id === socket.id).symbol;
  // console.log(socket);
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
  console.log(socket);
  socket.currentPlayer = gameState.currentPlayer;
  socket.gameField = gameState.gameField;
  setViewUpdateField(gameState);
  console.log(socket);
};