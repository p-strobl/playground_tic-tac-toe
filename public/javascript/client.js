"use strict";
import {
  getHeaderInfoContent,
  getFooterStatusContent,
  getFieldCells
} from "../helpers/domHelper.js";

const socket = io.connect();

socket.on("message", message => {
  getFooterStatusContent.innerHTML = message;
});

const clickOnFieldCell = () => {
  getFieldCells.forEach(cell => cell.addEventListener("click", () => {
    socket.emit("fieldClicked", cell.id.substring(4));
  }));
};

clickOnFieldCell();