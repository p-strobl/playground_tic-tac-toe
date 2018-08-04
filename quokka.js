let clients = {
  player: [],
  spectator: []
};

clients.player.push("qqq");
clients.player.push("www");
clients.spectator.push("yyy");
clients.spectator.push("xxx");
clients.spectator.push("vvv");

Object.entries(clients).forEach(([key, value]) => {
  console.log(key);
  value.splice(value.indexOf("xxx"), 1);
  console.log(value);
});

// Object.entries(clients).forEach(([key, value]) => {
//   value.splice(value.indexOf("www"), 1);
// });
console.log(clients.player.length);
console.log(clients);