const { format } = require("date-fns");
const { v4: uuid } = require("uuid");

const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

//log even function

const logEvents = async (message, logName) => {
  const dateTime = `${format(new Date(), `MMddyyyy\tHH:mm:ss`)}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
  console.log(logItem);
  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    }
    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", logName),
      logItem
    );
  } catch (err) {
    console.log(`${err}`);
  }
};

const logger = (request, response, next) => {
  logEvents(
    `${request.method}\t${request.headers.origin}\t${request.url}`,
    "requestLog.txt"
  ); //message the file that it goes to
  console.log(`${request.method} ${request.path}`);
  next();
};

module.exports = { logEvents, logger };
