"use strict";

class Room {
  constructor() {}

  join(socket, room) {
    socket.join(room);
  }
};

module.exports = Room;