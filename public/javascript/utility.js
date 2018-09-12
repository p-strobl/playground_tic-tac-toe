"use strict";

import {
  setViewHeaderPlayerSymbol,
  setViewHeaderCurrentPlayer
} from "./view.js";

export const setType = (socket, type) => {
  socket.type = type;
};

export const setSymbol = (socket, users) => {
  socket.symbol = users.find(user => user.id === socket.id).symbol;
  setViewHeaderPlayerSymbol(socket.symbol);
};

export const setStartPlayer = (socket, startPlayer) => {
  socket.startPlayer = startPlayer;
  socket.currentPlayer = startPlayer;
  setViewHeaderCurrentPlayer(socket.startPlayer);
};