"use strict";

import {
  getGameFieldCells
} from "../helpers/domHelper.js";

import {
  setViewUpdateGameField,
  setViewFooterStatus
} from "./view.js";

export const clickedFieldCell = socket => {
  getGameFieldCells.forEach(clickedCell => clickedCell.addEventListener("click", () => {

    // if (socket.type === "player" && socket.symbol === socket.gameState.currentPlayer && validateMove(socket, clickedCell)) {
    if (validateMove(socket, clickedCell)) {
      socket.emit("playerMove", {
        cellId: clickedCell.id.substring(4),
        player: socket.symbol
      });
    } else {
      setViewFooterStatus("Dieses Feld ist bereits besetzt, bitte wählen Sie ein anderes, leeres Feld aus.");
    }
  }));
};

const validateMove = (socket, clickedCell) => {
  return socket.gameState.gameField[clickedCell.id.substring(4)] === null &&
    socket.type === "player" &&
    socket.symbol === socket.gameState.currentPlayer ?
    true : false;
};