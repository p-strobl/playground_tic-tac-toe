"use strict";
import {
  getHeaderInfoContent,
  getFooterStatusContent
} from "../helpers/domHelper.js";

const socket = io.connect();

socket.on("message", message => {
  console.log(message);
  getFooterStatusContent.innerHTML = message;
});