"use strict";

import {
  getFieldCells
} from "../helpers/domHelper.js";

import {
  setViewUpdateField
} from "./view.js";

export const clickedFieldCell = socket => {
  getFieldCells.forEach(cell => cell.addEventListener("click", () => {
    if (socket.type === "player" && socket.symbol === socket.currentPlayer) {
      const cellClickedFrom = {
        cellId: cell.id.substring(4),
        playerSymbol: socket.symbol,
        fieldState: socket.fieldState
      };
      // socket.emit("clickedCell", {
      //   clickedCell: cell.id.substring(4),
      //   playerSymbol: socket.symbol
      // });
      socket.emit("clickedCell", cellClickedFrom);
    }
  }));
};