"use strict";

import {
  getGameFieldCells
} from "../helpers/domHelper.js";

import {
  setViewUpdateGameField
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
      console.log("Wrong Move");
      // setViewErrorStatus();
    }
  }));
};

const validateMove = (socket, clickedCell) => {
  return socket.gameState.gameField[clickedCell.id.substring(4)] === null &&
    socket.type === "player" &&
    socket.symbol === socket.gameState.currentPlayer ?
    true : false;
};