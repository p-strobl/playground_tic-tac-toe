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
    this.webServer.listen(this.port, () =>
      console.log(`Server started at port: ${this.port}`));
  }
};

module.exports = WebServer;