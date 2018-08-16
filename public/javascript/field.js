"use strict";

import {
  getFieldCells
} from "../helpers/domHelper.js";

import {
  socket
} from "./client.js";

export const fieldReset = () =>
  getFieldCells.forEach(cell => cell.innerHTML = "");

export const fieldClickCell = () => {
  getFieldCells.forEach(cell => cell.addEventListener("click", () => {
    socket.emit("fieldClicked", cell.id.substring(4));
  }));
};