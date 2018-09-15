// var clients = [];
//
// const addToClients = (type, id, figure) => {
//   clients.push({
//     type: type,
//     id: id,
//     figure: figure
//   });
// };
//
// addToClients("player", "wweeddd", "");
// addToClients("player", "sdferger", "");
// addToClients("spectator", "r45zrthf", "");
//
// console.log(clients);
//
// const player = clients.filter(element => element.type === "player");
//
// const randomizedPlayers = player => {
//   const possibleFigure = "XO";
//   player[0].figure = possibleFigure.charAt(Math.floor(Math.random() * possibleFigure.length));
//   player[0].figure === "X" ?
//     player[1].figure = "O" :
//     player[1].figure = "X";
//   return player;
// };
// console.log(randomizedPlayers(player));
// console.log(player[Math.floor(Math.random() * player.length)]);
// console.log(player[Math.floor(Math.random() * player.length)]);
// console.log(player[Math.floor(Math.random() * player.length)]);
// console.log(player[Math.floor(Math.random() * player.length)]);
// console.log(player[Math.floor(Math.random() * player.length)]);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// // let cc = [
//
// // ];
//
//
//
// // // clients.player.push("qqq");
// // // clients.player.push("www");
// // // clients.spectator.push("yyy");
// // // clients.spectator.push("xxx");
// // // clients.spectator.push("vvv");
//
// // cc.push({
// //   type: "player",
// //   id: "ggg"
// // });
// // cc.push({
// //   type: "player",
// //   id: "hhh"
// // });
// // cc.push({
// //   type: "spectator",
// //   id: "www"
// // });
// // cc.push({
// //   type: "spectator",
// //   id: "ddd"
// // });
//
// // console.log(cc);
// // // console.log(cc.length)
// // // console.log(cc.filter(el => el.type === "player").length);
// // // console.log(cc.player.length);
// // cc = cc.filter(el => el.id !== "hhh");
//
// // // console.log(cc.filter(el => el.type === "player").length);
// // console.log(cc.find((el, ind) => {
// //   el.id === "www";
// //   ind
// //   // cc.splice(el, 1);
// // }));
//
// // // cc.find()
//
// // // console.log(clients);
// // console.log(cc);

// let field = [
//   ["", "", ""],
//   ["", "", ""],
//   ["", "", ""]
// ];

class Game {
  constructor(startPlayer) {
    this.startPlayer = startPlayer;
    this.field = new Array(9).fill("");
  }

  get currentPlayer() {
    return this.startPlayer === undefined ? this.startPlayer = "O" : this.startPlayer;
  }

  move(symbol, fieldId) {
    switch (true) {
      case this.field[fieldId] === "":
        this.field[fieldId] = symbol;
        break;
      case this.field[fieldId] !== "":
        return `Ungeueltiger Zug: Feld ${fieldId} ist nicht frei!`;

      default:
    }

    // this.result(this.field);
  }

  result(updatedField) {
    // console.log(updatedField);

  }
};

// module.exports = Game;
const game = new Game("X");


console.log(game.move("X", 8));
console.log(game.move("X", 8));
console.log(game.move("X", 7));
console.log(game.currentPlayer.length);

console.log(game);

const game2 = new Game();
console.log(game2);
console.log(game2.currentPlayer.length);













// let field = new Array(9).fill("");

// console.log(field[1][0]);

// console.log(flatten);

// const move = (symbol, fieldId) => {
//   field[fieldId] = symbol;
//   return field;
//   // field = [].concat(...field);
//   // field[fieldId] = symbol;
//   // let results = [];
//   // while (field.length) {
//   //   results.push(field.splice(0, 3));
//   // }
//   // results
//   // field.slice(0);
//   // field
//   // field = results.split(",", 2);
// };

// console.log(field);
// move("X", 8);
// move("X", 1);
// move("X", 3);
// move("X", 6);

// console.log(field);

// const result = move();
// console.log(result);
// const connectedPlayer = {
//   one: {
//     id: "ddd",
//     symbol: "X"
//   },
//   two: {
//     id: "vvv",
//     symbol: "O"
//   }
// };

// console.log(connectedPlayer);


// const test = Object.values(connectedPlayer).map(element => {
//   return {id: element.id, symbol: element.symbol};
// });

// test

// const bla = test.find(element => element.id === "ddd");

// console.log(bla.symbol);