"use strict";

class Room {
  constructor() {}

  join(socket, room) {
    socket.join(room);
    // console.log(socket);
  };

};

module.exports = Room;