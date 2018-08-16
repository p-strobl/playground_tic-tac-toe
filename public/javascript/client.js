"use strict";

import {
  fieldClickCell,
  fieldReset
} from "./field.js";

import {
  messageStatusFooter
} from "./message.js";

export const socket = io.connect();

socket.on("connect", () =>
  fieldReset());

socket.on("welcomeMessage", message =>
  messageStatusFooter(message));

const init = () => {
  fieldReset();
  fieldClickCell();
};

init();