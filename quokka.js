let clients = {
  player: [],
  spectator: []
};

let cc = [

];

clients.player.push("qqq");
clients.player.push("www");
clients.spectator.push("yyy");
clients.spectator.push("xxx");
clients.spectator.push("vvv");

cc.push({type: "player", id: "ggg"});
cc.push({type: "player", id: "hhh"});
cc.push({type: "spectator", id: "www"});
cc.push({type: "spectator", id: "ddd"});

console.log(cc);
// console.log(cc.length)
// console.log(cc.filter(el => el.type === "player").length);

// console.log(cc.player.length);
cc = cc.filter(el => el.id !== "hhh");
// console.log(cc.filter(el => el.type === "player").length);


// cc.find()


console.log(cc);