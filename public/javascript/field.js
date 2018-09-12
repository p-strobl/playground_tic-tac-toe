"use strict";

import {
  getFieldCells
} from "../helpers/domHelper.js";

export const clickedFieldCell = socket => {
  getFieldCells.forEach(cell => cell.addEventListener("click", () => {
    if (socket.type === "player" && socket.symbol === socket.currentPlayer) {
      socket.emit("clickedCell", {
        clickedCell: cell.id.substring(4),
        socketSymbol: socket.symbol
      });
    }
  }));
};