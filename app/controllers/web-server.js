"use strict";

class WebServer {
  constructor(webServer, port, path, server, express) {
    this.webServer = webServer;
    this.port = port;
    this.path = path;
    this.server = server;
    this.express = express;
    this.initRoutes();
    this.start();
  }

  initRoutes() {
    this.server.use(this.express.static(this.path.join(__dirname, "../../public")));
  }

  start() {
    this.webServer.listen(this.port, () => {
      const preStart = "[31m[4m[1m";
      const preEnd = "[22m[24m[39m";
      const text = "Tic-Tac-Toe server started @port:";
      console.log("**************************************");
      console.log(`${text} ${preStart}${this.port}${preEnd}`);
      console.log("**************************************");
    });
  };
};

module.exports = WebServer;