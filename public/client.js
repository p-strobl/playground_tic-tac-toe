"use strict";

const socket = io.connect();


socket.on("disconnect", () => socket.disconnect());