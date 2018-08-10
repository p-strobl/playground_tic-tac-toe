const Message = require("../models/message.js");
const Global = require("../server.js");

class Client {

  constructor(socket, kind, playerCount) {
    this.socket = socket;
    this.kind = kind;
    this.playerCount = playerCount;
    this.addToClients();
    this.joinRoom();
    this.roomMessage();
  }

  addToClients() {
    Global.clients.push({
      kind: this.kind,
      id: this.socket.id
    });
  }

  joinRoom() {
    this.socket.join(this.kind);
  }

  roomMessage() {
    new Message(this.kind, this.playerCount).welcome();

    // let message = new Message(this.playerCount).welcome();
    // let message = new Message().welcome();
    // Global.io.to(this.kind).emit("message", message);
  }

  static removeFromClients(socket) {
    new Message(this.kind, this.playerCount).welcome();
    // Global.clients = Global.clients.filter(client => client.id !== socket.id);
    // Global.clients = Global.clients.filter(client => client.id !== socket.id);
    // let length = Global.clients.filter(client => client.kind === "player").length;
    // let message = new Message(length).welcome();
    // console.log(message);
    return Global.clients = Global.clients.filter(client => client.id !== socket.id);
  }

};

module.exports = Client;