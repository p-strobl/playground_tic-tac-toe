"use strict";

import {
  setViewHeaderPlayerSymbol,
  setViewHeaderCurrentPlayer,
  setViewFooterStatus,
  setViewNewGameField,
  setViewUpdateGameField
} from "./view.js";

const setClientStatus = (type, playerCount) => {
  const status = {
    player: {
      one: "Bitte warten Sie auf Ihren Gegner!",
      two: "Zwei Spieler verbunden. Spiel kann beginnen!"
    },
    spectator: {
      all: "Sorry, es waren bereits genug Spieler online."
    }
  };
  if (type === "player" && playerCount === 0) {
    setViewFooterStatus(status.player.one);
  } else if (type === "player" && playerCount === 1) {
    setViewFooterStatus(status.player.two);
  } else if (type === "spectator") {
    setViewFooterStatus(spectator.all);
  }
};

export const setClientType = (socket, clientType) => {
  socket.type = clientType;
};

export const startNewGame = (socket, newGame) => {
  // console.log(game);
  socket.gameState = newGame.gameState;
  if (socket.type === "player") {
    setPlayerSymbol(socket, newGame.playerSymbols);
  }
  setViewNewGameField();
  setViewHeaderCurrentPlayer(newGame.gameState.currentPlayer);
  console.log(socket);
  // console.log(socket);
  // setViewFooterStatus(socket.type, readyState.gameReady);
};

export const updateGameState = (socket, updatedGame) => {
  console.log(updatedGame);
  socket.gameState = updatedGame.gameState;
  setViewUpdateGameField(updatedGame.gameState);
  setViewHeaderCurrentPlayer(updatedGame.gameState.currentPlayer);
  console.log(socket.gameState);
};

const setPlayerSymbol = (socket, players) => {
  socket.symbol = players.find(player => player.id === socket.id).symbol;
  console.log(socket);
  setViewHeaderPlayerSymbol(socket.symbol);
};

export const setStartPlayer = (socket, startPlayer) => {
  socket.startPlayer = startPlayer;
  setCurrentPlayer(socket, startPlayer);
};

export const setCurrentPlayer = (socket, currentPlayer) => {
  socket.currentPlayer = currentPlayer;
  setViewHeaderCurrentPlayer(currentPlayer);
};

// export const setFooterStatus = message => {
//   setViewFooter(message);
// };



// export const setClientState = (socket, clientState) => {

// };

export const setGameState = (socket, gameState) => {
  console.log(socket);
  socket.currentPlayer = gameState.currentPlayer;
  socket.gameField = gameState.gameField;
  setViewUpdateField(gameState);
  console.log(socket);
};