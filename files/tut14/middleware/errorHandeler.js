const { logEvents } = require("./logEvents");

const erroHandeler = (error, request, response, next) => {
  logEvents(`${error.name}: ${error.message}`, "errorLog.txt");
  console.error(error.stack);
  response.status(500).send(error.message);
};

module.exports = erroHandeler;
