const Client = require("../user/client.js");
// const clients = [];

class Utility {
  constructor(socket, clients) {
    this.socket = socket;
    this.clients = clients;
  }

  playerCount() {
    return this.clients.filter(client => client.type === "player").length;
  }

  divideClients() {
    this.playerCount() < 2 ?
      new Client(this.socket, this.clients, "player", "Player-room").addToClients() :
      new Client(this.socket, this.clients, "spectator", "Spectator-room").addToClients();
  };
};

// 
// const welcomeMessage = (clientCount, socket) => {
//   switch (true) {
//     case clientCount === 1:
//       socket.send("Bitte warten Sie auf Ihren gegner!");
//       // getFooterStatusContent.innerHTML = "Bitte warten Sie auf Ihren gegner!";
//       break;
//     case clientCount === 2:
//       socket.send("Zwei Spieler verbunden. Spiel kann beginnen!");

//       // getFooterStatusContent.innerHTML = "Zwei Spieler verbunden. Spiel kann beginnen!";
//       break;
//     case clientCount > 2:
//       socket.send("Es sind bereits zwei Spieler verbunden, bitte versuchen Sie es später noch ein mal.");

//       // getFooterStatusContent.innerHTML = "Es sind bereits zwei Spieler verbunden, bitte versuchen Sie es später noch ein mal.";
//       break;
//     default:
//   }
// };

module.exports = Utility;