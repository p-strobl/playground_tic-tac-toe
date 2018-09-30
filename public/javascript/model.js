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
    // const permission = determinPermission(socket, clickedField);
    // if (permission.valid) {
    if (socket.type === "player") {
      socket.emit("playerMove", {
        fieldId: clickedField.id.substring(4),
        player: socket.symbol
      });
    } else {
      setViewFooterStatus('Sie können nicht in das Spielgeschehen eingreifen, bitte genießen Sie das laufende Spiel!');
    }
    // }
  }));
};

const determinPermission = (socket, clickedField) => {
  // console.log(socket.gameState);
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

export const determineEndGameMessage = gameState => {
  switch (gameState.result) {
    case 'X':
    case 'O':
      return `Spiel beendet: Spieler ${gameState.result} hat gewonnen!`;
    case '­-':
      return "Spiel endet unentschieden!";
    default:
  }
};