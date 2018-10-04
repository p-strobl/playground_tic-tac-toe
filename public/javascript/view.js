"use strict";

import {
  getGameFields,
  getHeaderInfoPlayerSymbol,
  getHeaderInfoCurrentPlayer,
  getFooterStatusContent,
  getRestartButton
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
  getGameFields.forEach(field => field.textContent = "");
};

export const setViewResetView = () => {
  getHeaderInfoPlayerSymbol.textContent = "";
  getHeaderInfoCurrentPlayer.textContent = "";
  setViewNewGameField();
};

export const setViewUpdateGameField = updatedGame => {
  return getGameFields[updatedGame.clickedField].textContent = updatedGame.clickedPlayer;
};

export const setViewSpectatorGameField = gameState => {
  Object.entries(gameState.gameField).forEach(([key, value]) => {
    getGameFields[key].textContent = value;
  });
};

export const setViewSpectatorStatus = (status) => {
  getHeaderInfoPlayerSymbol.textContent = status.header;
  getFooterStatusContent.textContent = status.footer;
};

export const setViewHideResetButton = () => {
  getRestartButton.style.display = "none";
};

export const setViewShowResetButton = socket => {
  if (socket.type === "player") getRestartButton.style.display = "block";
};