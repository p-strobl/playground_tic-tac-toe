"use strict";

export const setSymbol = (socket, userSymbol) => {
  socket.symbol = userSymbol.find(user => user.id === socket.id).symbol;
  console.log(socket.id + " : " + socket.symbol);
};