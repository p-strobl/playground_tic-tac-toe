"use strict";

import {
  getFieldWraps,
  getRestartButton
} from "../helpers/domHelper.js";

import {
  setViewFooterStatus
} from "./gameView.js";

/**
 * Listen for user side game restart event
 * @function userSideGameRestart
 * @param   {Object} socket Clients socket object
 * @returns {Event}         Emit userSideGameRestart event
 */
export const userSideGameRestart = socket => {
  removeFlipClass();
  getRestartButton.addEventListener("click", () => {
    socket.emit("userSideGameRestart");
  });
};

/**
 * Listen for client side field click
 * @function determineClickedField
 * @param   {Object} socket Clients socket object
 * @returns {Object} player symbol & clicked field id & player type
 */
export const determineClickedField = socket => {
  getFieldWraps.forEach(clickedField => clickedField.addEventListener("click", () => {
    socket.emit("playerMove", {
      fieldId: clickedField.children[0].id.substring(4),
      player: socket.symbol,
      type: socket.type
    });
  }));
};

/**
 * Find all Fields with class flipped attached and removes it
 * @function removeFlipClass
 */
export const removeFlipClass = () => {
  getFieldWraps.forEach(field => field.classList.remove("flipped"));
};