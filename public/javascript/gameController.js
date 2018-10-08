"use strict";

import {
  removeFlipClass
} from "./gameModel.js";

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
} from "./gameView.js";

import {
  getFrontCards,
  getHeaderInfoContent,
  getHeaderInfoCurrentPlayer
} from "../helpers/domHelper.js";

/**
 * Add's client type to socket object
 * @function setClientType
 * @param {Object} socket     Clients socket object
 * @param {String} clientType player || spectator
 */
export const setClientType = (socket, clientType) => {;
  socket.type = clientType;
};

/**
 * Hand round new game object and player symbol
 * @function startNewGame
 * @param {Object} socket  Clients socket object
 * @param {Object} newGame Server emittet game object
 */
export const startNewGame = (socket, newGame) => {
  socket.game = newGame.game;
  removeFlipClass();
  if (socket.type === "player") {
    setPlayerSymbol(socket, newGame.playerSymbols);
    setViewFooterStatus(newGame.game.status);
  }
  setViewNewGameField(newGame.game.gameField);
  setViewHeaderCurrentPlayer(newGame.game.currentPlayer);
  setViewHideResetButton();
};

/**
 * Set player symbol
 * @function setPlayerSymbol
 * @param {Object} socket  Clients socket object
 * @param {Object} players Players with set symbols
 */
const setPlayerSymbol = (socket, players) => {
  socket.symbol = players.find(player => player.id === socket.id).symbol;
  setViewHeaderPlayerSymbol(socket.symbol);
};

/**
 * Hand round current game state
 * @function updateGameState
 * @param {Object} socket      Clients socket object
 * @param {Object} updatedGame Current game state
 */
export const updateGameState = (socket, updatedGame) => {
  if (updatedGame.valid) {
    socket.game = updatedGame;
    setViewUpdateGameField(updatedGame);
    setViewHeaderCurrentPlayer(updatedGame.currentPlayer);
    if (updatedGame.result !== "") setViewShowResetButton(socket);
  }
  setViewFooterStatus(updatedGame.status);
};

/**
 * Hand round current game state for spectator view
 * @function setSpectatorState
 * @param {Object} socket      Clients socket object
 * @param {Object} currentGame Current game state
 */
export const setSpectatorState = (socket, currentGame) => {
  socket.game = currentGame.game;
  setViewHeaderCurrentPlayer(currentGame.game.currentPlayer);
  setViewSpectatorGameField(currentGame.game);
  setViewSpectatorStatus(currentGame.status);
};

/**
 * Hand over message on wait for opponent state
 * @function setWaitForOpponent
 * @param {String} message Wait for opponent footer status message
 */
export const setWaitForOpponent = message => {
  setViewResetView();
  setViewFooterStatus(message);
};