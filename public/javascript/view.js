"use strict";

import {
  getGameFieldCells,
  getHeaderInfoPlayerSymbol,
  getHeaderInfoCurrentPlayer,
  getFooterStatusContent
} from "../helpers/domHelper.js";

export const setViewHeaderPlayerSymbol = playerSymbol => {
  getHeaderInfoPlayerSymbol.textContent = `Sie spielen als ${playerSymbol}`;
};

export const setViewHeaderCurrentPlayer = currentPlayer => {
  getHeaderInfoCurrentPlayer.textContent = `Am Zug ist: ${currentPlayer}`;
};

export const setViewFooterStatus = statusMessage => {
  getFooterStatusContent.textContent = statusMessage;
};

export const setViewNewGameField = () => {
  getGameFieldCells.forEach(cell => cell.textContent = "");
};

export const setViewUpdateGameField = updatedGameState => {
  return getGameFieldCells[updatedGameState.clickedCell].textContent = updatedGameState.clickedPlayer;
};

export const setViewSpectatorGameField = gameState => {
  Object.entries(gameState.gameField).forEach(([key, value]) => {
    getGameFieldCells[key].textContent = value;
  });
};

export const setViewSpectatorStatus = () => {
  getHeaderInfoPlayerSymbol.textContent = "Sie befinden sich im Zuschauer-Modus!";
  getFooterStatusContent.textContent = "Sorry, es waren bereits genug Spieler online.";
};