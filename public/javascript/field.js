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
      socket.emit("fieldClicked", {clickedFieldCell: cell.id.substring(4), socketId: socket.id});
    }
  }));
};