const http = require('http');
const port = 1122;
const app = require('./app');
const server = http.createServer(app);

function startServer() {
  server.listen(port);
  console.log("The server is listening on the port: " + port);
}

startServer();