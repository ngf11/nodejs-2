const fs = require("fs");
const path = require("path");
const { exit } = require("process");

fs.readFile(
  path.join(__dirname, "files", "started.txt"),
  "utf8",
  (err, data) => {
    if (err) throw err;
    console.log(data);
  }
);
console.log("Hello...");

fs.writeFile(path.join(__dirname, "files", "reply.txt"), (err) => {
  if (err) throw err;
  console.log(data);
});

//exit uncaught error
process.on("uncaughtException", (err) => {
  console.error(`There was an uncaught error:${err}`);
  process.exit(1);
});
