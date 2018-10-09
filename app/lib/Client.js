"use strict";
//@ts-check

const utilities = require("./utilities.js");

// /** Class create new Client  */
class Client {
  /**
   * @constructor Client
   * @param {Object} io      Global io object
   * @param {Object} socket  Clients socket object
   * @param {Array}  clients Global client array
   */
  constructor(io, socket, clients) {
    this.id = socket.id;
    this.type = this.defineType(io, clients);
    this.joinRoom(socket);
  }

  /**
   * Define client type, based on already connected player count
   * @function defineType
   * @param   {Object} io      Global io object
   * @param   {Array}  clients Global client array
   * @returns {String} Player type
   */
  defineType(io, clients) {
    const type = utilities.playerRoomCount(io, clients) < 2 ?
      "player" :
      "spectator";
    return type;
  }

  /**
   * Join's socket room based on type
   * @function joinRoom
   * @param {Object} socket Clients socket object
   */
  joinRoom(socket) {
    socket.join(this.type);
  }

};

module.exports = Client;