"use strict";

import {
  getFieldWraps,
  getRestartButton
} from "../helpers/domHelper.js";

import {
  setViewFooterStatus
} from "./view.js";

export const userSideGameRestart = socket => {
  removeFlipClass();
  getRestartButton.addEventListener("click", () => {
    socket.emit("userSideGameRestart");
  });
};

export const determineClickedField = socket => {
  getFieldWraps.forEach(clickedField => clickedField.addEventListener("click", () => {
    socket.emit("playerMove", {
      fieldId: clickedField.children[0].id.substring(4),
      player: socket.symbol,
      type: socket.type
    });
  }));
};

export const removeFlipClass = () => {
  getFieldWraps.forEach(field => field.classList.remove("flip"));
};