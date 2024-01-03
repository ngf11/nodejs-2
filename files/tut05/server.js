const logEvents = require("./logEvents");

const EventEmitter = require("events");

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

myEmitter.on("log", (msg) => logEvents(msg));

setTimeout(() => {
  //emitt the event
  myEmitter.emit("log", "Log event emitted!");
}, 2000);
