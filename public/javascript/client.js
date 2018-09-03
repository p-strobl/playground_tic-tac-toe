"use strict";

import {
  clickedFieldCell,
} from "./field.js";

export const socket = io.connect();

socket.on("connect", () => {
  socket.on("userType", type => socket.type = type);
});

console.log(socket);

const init = () => {
  clickedFieldCell(socket);
};

init();