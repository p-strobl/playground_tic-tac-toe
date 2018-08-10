const Global = require("../server.js");

// Create client class
class Client {

  constructor(socket, type, message) {
    Object.assign(this, {
      socket,
      type,
      message
    });
    this.addToClients();
    this.joinRoom();
    this.roomMessage();
  }

  addToClients() {
    Global.clients.push({
      type: this.type,
      id: this.socket.id
    });
  }

  joinRoom() {
    this.socket.join(this.type);
  }

  roomMessage() {
    Global.io.to(this.type).emit("message", this.message);
  }

  static removeFromClients(socket) {
    return Global.clients = Global.clients.filter(client => client.id !== socket.id);
  }

};

module.exports = Client;