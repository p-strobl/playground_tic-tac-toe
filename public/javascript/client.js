"use strict";

import {
  clickedFieldCell, updateField
} from "./field.js";
import {
  setSymbol
} from "./utility.js";

export const socket = io.connect();

socket.on("connect", () => {
  socket.on("userType", type => socket.type = type);
  socket.on("userSymbol", userSymbol => setSymbol(socket, userSymbol));
  socket.on("updateField", receivedData => updateField(receivedData));
});

// console.log(socket);

const init = () => {
  clickedFieldCell(socket);
};

init();