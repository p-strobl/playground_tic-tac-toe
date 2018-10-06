"use strict";

import {
  getGameFields,
  getRestartButton,
  getHeaderInfoCurrentPlayer
} from "../helpers/domHelper.js";

import {
  setViewFooterStatus
} from "./view.js";

export const userSideGameRestart = socket => {
  getRestartButton.addEventListener("click", () => {
    socket.emit("userSideGameRestart");
  });
};

export const determineClickedField = socket => {
  getGameFields.forEach(clickedField => clickedField.addEventListener("click", () => {
    socket.emit("playerMove", {
      fieldId: clickedField.id.substring(4),
      player: socket.symbol,
      type: socket.type
    });
  }));
};