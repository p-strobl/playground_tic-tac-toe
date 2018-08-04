"use strict";
import {
  getHeaderInfoContent,
  getFooterStatusContent
} from "./domHelper.js";

const socket = io.connect();

socket.on("message", message => {
  console.log(message);
  getFooterStatusContent.innerHTML = message;
});

// socket.on("clientCount", clientNumber => {
//   welcomeMessage(clientNumber);
//   console.log(clientNumber);
// });