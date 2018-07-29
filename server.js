"use strict";

const express = require("express");
const server = express();

server.use(express.static("public"));

server.listen(8083, () => {
 console.log("Server started at port 8083.");
});


