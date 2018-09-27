"use strict";

import {
  getGameFieldCells,
  getRestartButton
} from "../helpers/domHelper.js";

import {
  setViewFooterStatus
} from "./view.js";

export const clickedFieldCell = socket => {
  getGameFieldCells.forEach(clickedCell => clickedCell.addEventListener("click", () => {

    const permission = determinPermission(socket, clickedCell);
    console.log(socket.gameState.gameField);
    console.log(permission);
    if (permission.valid === true) {
      socket.emit("playerMove", {
        cellId: clickedCell.id.substring(4),
        player: socket.symbol
      });
    }
    setViewFooterStatus(permission.message);
  }));
};

const determinPermission = (socket, clickedCell) => {
  if (socket.type === "spectator") {
    return {
      valid: false,
      message: "Sie können nicht in das Spielgeschehen eingreifen, bitte genießen Sie das laufende Spiel!"
    };
  } else if (socket.type === "player" && socket.gameState.gameField[clickedCell.id.substring(4)] !== null) {
    return {
      valid: false,
      message: "Dieses Feld ist bereits besetzt, bitte wählen Sie ein anderes, noch leeres Feld aus."
    };
  } else if (socket.type === "player" && socket.symbol !== socket.gameState.currentPlayer) {
    return {
      valid: false,
      message: "Sie sind nicht am Zug, bitte warten Sie den Zug Ihres Gegner's ab."
    };
  } else {
    return {
      valid: true,
    }
  }
};

export const userSideGameRestart = socket => {
  getRestartButton.addEventListener("click", () => {
    socket.emit("userSideGameRestart");
  });
};