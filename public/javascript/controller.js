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
  setViewNewGameField();
  setViewHideResetButton();
  setViewHeaderCurrentPlayer(newGame.game.currentPlayer);
};

const setPlayerSymbol = (socket, players) => {
  socket.symbol = players.find(player => player.id === socket.id).symbol;
  setViewHeaderPlayerSymbol(socket.symbol);
};

export const updateGameState = (socket, updatedGame) => {
  // getHeaderInfoCurrentPlayer.classList.remove("wiggleMe");
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


// export const setStartPlayer = (socket, startPlayer) => {
//   socket.startPlayer = startPlayer;
//   setCurrentPlayer(socket, startPlayer);
// };

// export const setCurrentPlayer = (socket, currentPlayer) => {
//   socket.currentPlayer = currentPlayer;
//   setViewHeaderCurrentPlayer(currentPlayer);
// };

// export const setGameState = (socket, gameState) => {
//   socket.currentPlayer = gameState.currentPlayer;
//   socket.gameField = gameState.gameField;
//   setViewUpdateField(gameState);
// };

export const setWaitForOpponent = message => {
  setViewResetView();
  setViewFooterStatus(message);
};