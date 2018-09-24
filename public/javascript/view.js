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

export const setViewFooterStatus = message => {
  getFooterStatusContent.innerText = message;
};

export const setViewNewGameField = () => {
  getGameFieldCells.forEach(cell => cell.innerHTML = "");
};

export const setViewUpdateGameField = updatedGameState => {
  return getGameFieldCells[updatedGameState.clickedCell].innerHTML = updatedGameState.clickedPlayer;
};

export const setViewErrorStatus = () => {

};

export const setViewSpectatorGameField = gameState => {
  Object.entries(gameState._gameField).forEach(([key, value]) => {
    getGameFieldCells[key].innerHTML = value;
  });
};