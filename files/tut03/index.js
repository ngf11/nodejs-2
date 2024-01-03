const logEvents = require("./logEvents");

const EventEmitter = require("events");

//object class
class MyEmitter extends EventEmitter {}

//initiolize the Object

const myEmitter = new MyEmitter();

//add a Listener for the log event
myEmitter.on("log", (msg) => logEvents(msg));

setTimeout(() => {
  //emitt the event
  myEmitter.emit("log", "Log event emitted!");
}, 2000);
