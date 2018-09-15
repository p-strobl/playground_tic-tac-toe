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
  updateField,
  setViewHeaderCurrentPlayer
} from "./view.js";

import {
  messageStatusFooter
} from "./message.js";

export const socket = io.connect();

socket.on("connect", () => {
  socket.on("clientType", type => setType(socket, type));
  socket.on("clientStatus", message => messageStatusFooter(message));
  socket.on("clientSymbol", users => setSymbol(socket, users));
  socket.on("startPlayer", startPlayer => setStartPlayer(socket, startPlayer));
  // socket.on("currentPlayer", currenPlayer => setCurrentPlayer(currenPlayer));
  console.log(socket);
  // socket.on("updateField", receivedData => updateField(receivedData));
});

// console.log(socket);

const init = () => {
  clickedFieldCell(socket);
};

init();