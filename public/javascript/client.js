"use strict";

import {
  fieldClickCell,
  fieldReset
} from "./field.js";

import {
  messageStatusFooter
} from "./message.js";

export const socket = io.connect();

// socket.on("connect", () =>
// fieldReset());
console.log(socket);

socket.on("status", message => messageStatusFooter(message));

const init = () => {
  // fieldReset();
  fieldClickCell();
};

init();