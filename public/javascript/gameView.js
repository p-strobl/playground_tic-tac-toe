"use strict";

import {
  getHeaderInfoPlayerSymbol,
  getHeaderInfoCurrentPlayer,
  getFooterStatusContent,
  getRestartButton,
  getFrontCards,
  getBackCards,
  getFieldWraps
} from "../helpers/domHelper.js";

export const setViewHeaderPlayerSymbol = playerSymbol => {
  getHeaderInfoPlayerSymbol.textContent = `Sie spielen als ${playerSymbol}`;
};

export const setViewHeaderCurrentPlayer = currentPlayer => {
  getHeaderInfoCurrentPlayer.textContent = `Am Zug ist: ${currentPlayer}`;
  getHeaderInfoCurrentPlayer.classList.add("wiggleMe");
  getHeaderInfoCurrentPlayer.addEventListener("animationend", () => {
    getHeaderInfoCurrentPlayer.classList.remove("wiggleMe");
  }, true);
};

export const setViewFooterStatus = statusMessage => {
  getFooterStatusContent.textContent = statusMessage;
  getFooterStatusContent.classList.add("grow");
  getFooterStatusContent.addEventListener("transitionend", () => {
    getFooterStatusContent.classList.remove("grow");
  }, true);
};

export const setViewNewGameField = gameField => {
  getBackCards.forEach((field, index) => field.textContent = gameField[index]);
  getFrontCards.forEach(card => card.classList.remove("flip"));
};

export const setViewResetView = () => {
  getHeaderInfoPlayerSymbol.textContent = "";
  getHeaderInfoCurrentPlayer.textContent = "";
};

export const setViewUpdateGameField = updatedGame => {
  getBackCards[updatedGame.clickedField].textContent = updatedGame.clickedPlayer;
  getFieldWraps[updatedGame.clickedField].classList.add("flip");
};

export const setViewSpectatorGameField = gameState => {
  Object.entries(gameState.gameField).forEach(([key, value]) => {
    getFrontCards[key].textContent = value;
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