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

/**
 * Set player symbol in header status
 * @function setViewHeaderPlayerSymbol
 * @param {String} playerSymbol Player symbol
 */
export const setViewHeaderPlayerSymbol = playerSymbol => {
  getHeaderInfoPlayerSymbol.textContent = `Sie spielen als ${playerSymbol}`;
};

/**
 * Set current player in header status
 * Add "wiggle" class to it and removes it after animation ends
 * @function setViewHeaderCurrentPlayer
 * @param {String} currentPlayer Current player symbol
 */
export const setViewHeaderCurrentPlayer = currentPlayer => {
  getHeaderInfoCurrentPlayer.textContent = `Am Zug ist: ${currentPlayer}`;
  getHeaderInfoCurrentPlayer.classList.add("wiggleMe");
  getHeaderInfoCurrentPlayer.addEventListener("animationend", () => {
    getHeaderInfoCurrentPlayer.classList.remove("wiggleMe");
  }, false);
};

/**
 * Set status message in footer status
 * Add "grow" class to it and removes it after animation ends
 * @function setViewFooterStatus
 * @param {String} statusMessage Footer status message
 */
export const setViewFooterStatus = statusMessage => {
  getFooterStatusContent.textContent = statusMessage;
  getFooterStatusContent.classList.add("grow");
  getFooterStatusContent.addEventListener("transitionend", () => {
    getFooterStatusContent.classList.remove("grow");
  }, false);
};

/**
 * Set current game field in view.
 * Removes "flipped" class from field element.
 * @function setViewNewGameField
 * @param {Array} gameField Received current game field
 */
export const setViewNewGameField = gameField => {
  getBackCards.forEach((field, index) => field.textContent = gameField[index]);
  getFieldWraps.forEach(card => card.classList.remove("flipped"));
};

/**
 * Reset Header view
 * @function setViewResetView
 */
export const setViewResetView = () => {
  getHeaderInfoPlayerSymbol.textContent = "";
  getHeaderInfoCurrentPlayer.textContent = "";
};

/**
 * Set's player symbol to card back and add's "flipped" class
 * @function setViewUpdateGameField
 * @param {String} updatedGame Valid player symbol
 */
export const setViewUpdateGameField = updatedGame => {
  getBackCards[updatedGame.clickedField].textContent = updatedGame.clickedPlayer;
  getFieldWraps[updatedGame.clickedField].classList.add("flipped");
};

/**
 * Set's the view of the game field for currently running game as a spectator connect's
 * @function setViewSpectatorGameField
 * @param {Object} gameState Current game object
 */
export const setViewSpectatorGameField = gameState => {
  Object.entries(gameState.gameField).forEach(([key, value]) => {
    getFrontCards[key].textContent = value;
  });
};

/**
 * Set's the view of the game status for the currently running game as a spectator connect's
 * @function setViewSpectatorStatus
 * @param {Object} status Current game status message
 */
export const setViewSpectatorStatus = status => {
  getHeaderInfoPlayerSymbol.textContent = status.header;
  getFooterStatusContent.textContent = status.footer;
};

/**
 * Hide's the restart button
 * @function setViewHideResetButton
 */
export const setViewHideResetButton = () => {
  getRestartButton.style.display = "none";
};

/**
 * Show's the restart button to currently connected player, after game end's
 * @function setViewShowResetButton
 * @param {Object} socket Clients socket object
 */
export const setViewShowResetButton = socket => {
  if (socket.type === "player") getRestartButton.style.display = "block";
};