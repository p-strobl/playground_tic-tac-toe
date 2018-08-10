const Global = require("../server.js");

class Message {

  constructor(kind, playerCount) {
    this.kind = kind;
    this.playerCount = playerCount;
  }

  welcome() {
    let message = "";
    switch (true) {
      case this.playerCount < 1:
        message = "Player One";
        break;
      case this.playerCount === 1:
        message = "Player Two";
        break;
      case this.playerCount >= 2:
        message = "Spectator";
        break;
      default:
    }
    Global.io.to(this.kind).emit("message", message);
  };
};

module.exports = Message;