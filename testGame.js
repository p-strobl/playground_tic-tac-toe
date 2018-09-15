"use strict";
const Game = require('./GameModule.js');
// console.log(gameModule);
const expect = (test, res1, res2) => {

  if (res1 !== res2) {
    console.log('Fehler in Test ' + test);
    console.log('erhalten: "' + res1 + '"');
    console.log('erwartet: "' + res2 + '"');
    process.exit(1);
  }
};

// const game1 = new gameModule.Game('X');
// expect(1, game1.move('X', 0), '');
// expect(2, game1.move('X', 0), 'Ungueltiger Zug: X ist nicht am Zug!');
// expect(3, game1.move('O', 2), '');
// expect(4, game1.move('X', 2), 'Ungueltiger Zug: Feld 2 ist nicht frei!');
// expect(5, game1.move('X', 4), '');
// expect(6, game1.move('O', 8), '');
// expect(7, game1.move('X', 3), '');
// expect(8, game1.move('O', 5), '');
// expect(9, game1.move('X', 6), 'Ungueltiger Zug: Das Spiel ist zu Ende!');
// expect(10, game1.result, 'O'); // O gewinnt

// const game2 = new gameModule.Game('O');
// expect(11, game2.move('O', 0), '');
// expect(12, game2.move('X', 1), '');
// expect(13, game2.move('O', 2), '');
// expect(14, game2.move('X', 4), '');
// expect(15, game2.move('O', 7), '');
// expect(16, game2.move('X', 3), '');
// expect(17, game2.move('O', 5), '');
// expect(18, game2.move('X', 8), '');
// expect(19, game2.move('O', 6), '');
// expect(20, game2.result, '­'); // unentschieden

const game3 = new Game();
expect(21, game3.currentPlayer.length, 1); // Zufälliger Startspieler
console.log("Test OK");