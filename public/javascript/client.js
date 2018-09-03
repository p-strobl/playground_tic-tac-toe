"use strict";

import {
  clickedFieldCell,
  // fieldReset
} from "./field.js";

import {
  messageStatusFooter
} from "./message.js";

export const socket = io.connect();

socket.on("connect", () => {
  socket.on("userType", type => socket.type = type);
});
// socket.on("connect", () =>
// fieldReset());
// console.log(socket);

// socket.on("status", message => messageStatusFooter(message));

console.log(socket);

const init = () => {
  // fieldReset();
  clickedFieldCell(socket);
};

init();