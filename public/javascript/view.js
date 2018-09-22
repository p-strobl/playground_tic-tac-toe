"use strict";

import {
  getGameFieldCells,
  getHeaderInfoPlayerSymbol,
  getHeaderInfoCurrentPlayer,
  getFooterStatusContent
} from "../helpers/domHelper.js";

export const setViewHeaderPlayerSymbol = playerSymbol => {
  getHeaderInfoPlayerSymbol.innerHTML = `Sie spielen als ${playerSymbol}`;
};

export const setViewHeaderCurrentPlayer = currentPlayer => {
  getHeaderInfoCurrentPlayer.innerHTML = `Am Zug ist: ${currentPlayer}`;
};

export const setViewFooterStatus = (type, readyState) => {
  getFooterStatusContent.innerHTML = message;
};

export const setViewNewGameField = () => {
  getGameFieldCells.forEach(cell => cell.innerHTML = "");
};

export const setViewUpdateGameField = updatedGameState => {
  return getGameFieldCells[updatedGameState.clickedCell].innerHTML = updatedGameState.clickedPlayer;
};