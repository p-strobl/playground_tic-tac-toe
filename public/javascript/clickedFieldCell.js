"use strict";

import {
  getGameFieldCells
} from "../helpers/domHelper.js";

import {
  setViewUpdateGameField
} from "./view.js";

export const clickedFieldCell = socket => {
  getGameFieldCells.forEach(cell => cell.addEventListener("click", () => {
    console.log("click");
    console.log(socket);
    if (socket.type === "player" && socket.symbol === socket.gameState.currentPlayer && socket.symbol !== undefined) {
      const cellClickedFrom = {
        cellId: cell.id.substring(4),
        playerSymbol: socket.symbol
      };
      // socket.emit("clickedCell", {
      //   clickedCell: cell.id.substring(4),
      //   playerSymbol: socket.symbol
      // });
      console.log(cellClickedFrom);
      socket.emit("playerMove", cellClickedFrom);
    }
  }));
};