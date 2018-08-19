var clients = [];

const addToClients = (type, id, figure) => {
  clients.push({
    type: type,
    id: id,
    figure: figure
  });
};

addToClients("player", "wweeddd", "");
addToClients("player", "sdferger", "");
addToClients("spectator", "r45zrthf", "");

console.log(clients);

const player = clients.filter(element => element.type === "player");

const randomizedPlayers = player => {
  const possibleFigure = "XO";
  player[0].figure = possibleFigure.charAt(Math.floor(Math.random() * possibleFigure.length));
  player[0].figure === "X" ?
    player[1].figure = "O" :
    player[1].figure = "X";
  return player;
};



console.log(randomizedPlayers(player));




















// let cc = [

// ];



// // clients.player.push("qqq");
// // clients.player.push("www");
// // clients.spectator.push("yyy");
// // clients.spectator.push("xxx");
// // clients.spectator.push("vvv");

// cc.push({
//   type: "player",
//   id: "ggg"
// });
// cc.push({
//   type: "player",
//   id: "hhh"
// });
// cc.push({
//   type: "spectator",
//   id: "www"
// });
// cc.push({
//   type: "spectator",
//   id: "ddd"
// });

// console.log(cc);
// // console.log(cc.length)
// // console.log(cc.filter(el => el.type === "player").length);
// // console.log(cc.player.length);
// cc = cc.filter(el => el.id !== "hhh");

// // console.log(cc.filter(el => el.type === "player").length);
// console.log(cc.find((el, ind) => {
//   el.id === "www";
//   ind
//   // cc.splice(el, 1);
// }));

// // cc.find()

// // console.log(clients);
// console.log(cc);