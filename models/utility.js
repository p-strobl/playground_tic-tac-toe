const Client = require("../user/client.js");
// const Message = require("./communication.js");
const Global = require("../server.js");

class Utility {

  constructor(socket) {
    this.socket = socket;
  }

  playerCount() {
    return Global.clients.filter(client => client.type === "player").length;
  }

  divideClients() {
    let type = "";
    this.playerCount() < 2 ?
      type = "player" :
      type = "spectator";
    new Client(this.socket, type, "this.welcomeMessage()");
  };

};

module.exports = Utility;