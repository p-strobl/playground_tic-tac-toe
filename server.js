'use strict';

const express = require('express');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');

const PORT = 8083;
const server = express();
const webServer = http.Server(server);
const io = socketIo(webServer);

const Client = require('./app/module/Client.js');
const removeFromClients = require('./app/module/removeFromClients.js');
const playerRoomLength = require('./app/module/playerRoomLength.js');
const gameModule = require('./GameModule.js');

let clients = [];

module.exports.io = io;
module.exports.clients = clients;

class Server {
  constructor() {
    this.webServer = webServer;
    this.PORT = PORT;
    this.path = path;
    this.server = server;
    this.express = express;
    this.initRoutes(server, express, path);
    this.start(webServer, PORT);
  };

  initRoutes() {
    this.server.use(this.express.static(this.path.join(__dirname, './public')));
  };

  start() {
    this.webServer.listen(this.PORT, () => {
      const text = 'Tic-Tac-Toe server started @port: ';
      const preStart = '[31m[4m[1m';
      const preEnd = '[22m[24m[39m';
      console.log('**************************************');
      console.log(`${text}${preStart}${this.PORT}${preEnd}`);
      console.log('**************************************');
    });
  };
};

class Listener {
  constructor() {
    this.events();
  }

  events() {
    console.log('Listner', gameModule);
    const game = new gameModule.Game();

    io.sockets.on('connection', socket => {
      new Client(socket);
      this.determineGameStart(socket, game);
      console.log('Client connected, cliets.length = ' + clients.length);

      socket.on('playerMove', updateGameState => game.move(updateGameState.player, updateGameState.fieldId));
      socket.on('userSideGameRestart', () => this.userSideGameRestart(socket, game));

      socket.on('disconnect', () => {
        new removeFromClients(socket);
        console.log('Client disconnected, cliets.length = ' + clients.length);
      });
    });

  }

  determineGameStart(socket, game) {
    if (socket.type === 'player' && playerRoomLength() === 1) {
      socket.emit('waitForOpponent', {
        status: 'Bitte warten Sie auf Ihren Gegner!'
      });
    } else if (socket.type === 'player' && playerRoomLength() === 2) {
      game.start();
    } else if (socket.type === 'spectator') {
      socket.emit('spectateGame', {
        gameState: game
      });
    }
  }

  userSideGameRestart(socket, game) {
    if (playerRoomLength() === 2) {
      game.start();
    } else {
      socket.emit('waitForOpponent', {
        status: 'Bitte warten Sie auf Ihren Gegner!'
      });
    }
  }

};

const init = () => {
  new Server();
  new Listener();
};

init();