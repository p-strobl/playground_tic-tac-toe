var clients = [];

class Client {
  constructor(socket, type, message) {
    Object.assign(this, {
      socket,
      type,
      message
    });
    // this.type = type;
    // this.socket = socket;
    // this.message = message;
  };

  addToClients() {
    clients.push({
      type: this.type,
      id: this.socket.id
    });
  };

  static removeFromClients(socket) {
    clients = clients.filter(client => client.id !== socket);
  };

  joinRoom() {
    this.socket.join(this.type);
  };

  roomMessage() {
    io.to(this.type).emit("message", this.message);
  };
};
var socket = {
  id: "3434"
};

var client = new Client(socket, "player", "hello World");
client.addToClients();
console.log(client);
// ff.addToClient();
// var ff = new NewClient("player", "gggg", "ggg", "hello World");
// ff.addToClient();

console.log(clients);
Client.removeFromClients("3434");
console.log(clients);


















// let clients = {
//   player: [],
//   spectator: []
// };

let cc = [

];



// clients.player.push("qqq");
// clients.player.push("www");
// clients.spectator.push("yyy");
// clients.spectator.push("xxx");
// clients.spectator.push("vvv");

cc.push({
  type: "player",
  id: "ggg"
});
cc.push({
  type: "player",
  id: "hhh"
});
cc.push({
  type: "spectator",
  id: "www"
});
cc.push({
  type: "spectator",
  id: "ddd"
});

console.log(cc);
// console.log(cc.length)
// console.log(cc.filter(el => el.type === "player").length);
// console.log(cc.player.length);
cc = cc.filter(el => el.id !== "hhh");

// console.log(cc.filter(el => el.type === "player").length);
console.log(cc.find((el, ind) => {
  el.id === "www";
  ind
  // cc.splice(el, 1);
}));

// cc.find()

// console.log(clients);
console.log(cc);