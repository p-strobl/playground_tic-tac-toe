"use strict";

import {
  getFieldCells
} from "../helpers/domHelper.js";

import {
  setViewUpdateField
} from "./view.js";

export const clickedFieldCell = socket => {
  getFieldCells.forEach(cell => cell.addEventListener("click", () => {
    console.log("click");
    console.log(socket);
    if (socket.type === "player" && socket.symbol === socket.currentPlayer && socket.symbol !== undefined) {
      const cellClickedFrom = {
        cellId: cell.id.substring(4),
        playerSymbol: socket.symbol
      };
      // socket.emit("clickedCell", {
      //   clickedCell: cell.id.substring(4),
      //   playerSymbol: socket.symbol
      // });
      console.log(cellClickedFrom);
      socket.emit("clickedCell", cellClickedFrom);
    }
  }));
};