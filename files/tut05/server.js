const http = require("http");
const path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;

const logEvents = require("./logEvents");
const EventEmitter = require("events");
class Emitter extends EventEmitter {}
const myEmitter = new Emitter();

const PORT = process.env.PORT || 3500;

const server = http.createServer((request, response) => {
  console.log(request.url, request.method);
});
// server lisetitng for request
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// myEmitter.on("log", (msg) => logEvents(msg));
// myEmitter.emit("log", "Log event emitted!");
