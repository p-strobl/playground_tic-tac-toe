// Create client class
class Client {
  constructor(socket, clients, type, message) {
    Object.assign(this, {
      socket,
      clients,
      type,
      message
    });
  }

  addToClients() {
    this.clients.push({
      type: this.type,
      id: this.socket.id
    });
  }

  removeFromClients() {
    return this.clients = this.clients.filter(client => client.id !== this.socket.id);
  }

  // joinRoom() {
  //   this.socket.join(this.type);
  // }

  // roomMessage() {
  //   io.to(this.type).emit("message", this.message);
  // }
};

module.exports = Client;