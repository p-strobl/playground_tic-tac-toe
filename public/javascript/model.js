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
    } else {
      setViewFooterStatus("Sie können nicht in das Spielgeschehen eingreifen, bitte genießen Sie das laufende Spiel!");
    }
  }));
};

export const determineEndGameMessage = gameState => {
  switch (gameState.result) {
    case "X":
    case "O":
      return `Spiel beendet: Spieler ${gameState.result} hat gewonnen!`;
    case "­-":
      return "Spiel endet unentschieden!";
    default:
  }
};