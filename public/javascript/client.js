"use strict";

import {
  clickedFieldCell
} from "./field.js";

import {
  setType,
  setSymbol,
  setStartPlayer
} from "./utility.js";

import {
  updateField
} from "./view.js";

export const socket = io.connect();

socket.on("connect", () => {
  socket.on("userType", type => setType(socket, type));
  socket.on("userSymbol", users => setSymbol(socket, users));
  socket.on("startPlayer", startPlayer => setStartPlayer(socket, startPlayer));
  console.log(socket);
  // socket.on("updateField", receivedData => updateField(receivedData));
});

// console.log(socket);

const init = () => {
  clickedFieldCell(socket);
};

init();