"use strict";

import {
  getFieldCells,
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

export const setViewFooterStatus = message => {
  getFooterStatusContent.innerHTML = message;
};

export const setViewUpdateField = gameState => {
  return getFieldCells[gameState.clickedCell].innerHTML = gameState.clickedPlayer;
};