const fs = require("fs");
const path = require("path");

fs.readFile(path.join("starter.txt"), "utf8", (err, data) => {
  if (err) throw err;
  console.log(data);
});
console.log("Hello...");
//exit on uncaught error
fs.writeFile(path.join("reply.txt"), "Nice to meet you", (err) => {
  if (err) throw err;
  console.log(`Write Completed`);

  fs.appendFile(path.join("reply.txt"), "\n\nYest it is ", (err) => {
    if (err) throw err;
    console.log(`Append Completed`);
  });
});

process.on("uncaughtException", (err) => {
  console.error(`There was an uncought error: ${err}`);
  process.exit(1);
});
