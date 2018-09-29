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
    const permission = determinPermission(socket, clickedField);
    if (permission.valid) {
      socket.emit("playerMove", {
        fieldId: clickedField.id.substring(4),
        player: socket.symbol
      });
    }
    setViewFooterStatus(permission.message);
  }));
};

const determinPermission = (socket, clickedField) => {
  console.log(socket.gameState);
  if (socket.gameState.running === true) {
    if (socket.type === "spectator") {
      return {
        valid: false,
        message: "Sie können nicht in das Spielgeschehen eingreifen, bitte genießen Sie das laufende Spiel!"
      };
    } else if (socket.type === "player" && socket.gameState.gameField[clickedField.id.substring(4)] !== null) {
      return {
        valid: false,
        message: `Ungueltiger Zug: Feld ${clickedField.id.substring(4)} ist nicht frei!`
      };
    } else if (socket.type === "player" && socket.symbol !== socket.gameState.currentPlayer) {
      return {
        valid: false,
        message: `Ungueltiger Zug: ${socket.symbol} ist nicht am Zug!`
      };
    } else {
      return {
        valid: true,
      }
    }
  } else {
    return {
      valid: false,
      message: "Ungueltiger Zug: Das Spiel ist zu Ende"
    }
  }
};

export const determineStatusMessage = gameState => {
  console.log(gameState);
  switch (gameState.status) {
    case "twoPlayerStart":
      return "Zwei Spieler verbunden. Spiel kann beginnen!";
    case "won":
      return `Spiel beendet: Spieler ${gameState.result} hat gewonnen!`;
    case "tie":
      return "Spiel endet unentschieden!";
    case "wait":
      return "Bitte warten Sie auf Ihren Gegner!";
    default:
  }
};