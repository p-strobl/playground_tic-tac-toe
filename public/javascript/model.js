"use strict";

import {
  getGameFields,
  getRestartButton
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
    if (socket.type === "player") {
      socket.emit("playerMove", {
        fieldId: clickedField.id.substring(4),
        player: socket.symbol
      });
    }
  }));
};