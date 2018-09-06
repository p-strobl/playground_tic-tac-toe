"use strict";

import {
  getFieldCells
} from "../helpers/domHelper.js";

import {
  socket
} from "./client.js";

// export const fieldReset = () =>
//   getFieldCells.forEach(cell => cell.innerHTML = "");

export const clickedFieldCell = socket => {
  getFieldCells.forEach(cell => cell.addEventListener("click", () => {
    if (socket.type === "player") {
      socket.emit("cellClicked", {
        clickedCell: cell.id.substring(4),
        socketSymbol: socket.symbol,
        socketId: socket.id
      });
    }
  }));
};

export const updateField = clickedField => {
  return getFieldCells[clickedField.fieldId].innerHTML = clickedField.symbol;
};