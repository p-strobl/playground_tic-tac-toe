"use strict";

import {
  clickedFieldCell, updateField
} from "./field.js";

export const socket = io.connect();

socket.on("connect", () => {
  socket.on("userType", type => socket.type = type);
  socket.on("updateField", data => updateField(data));
});

// console.log(socket);

const init = () => {
  clickedFieldCell(socket);
};

init();