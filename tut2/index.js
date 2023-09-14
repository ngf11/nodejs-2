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

fs.writeFile(
  path.join(__dirname, "files", "reply.txt"),
  "Nice to meet you",
  (err) => {
    if (err) throw err;
    console.log("Write Completed");

    fs.appendFile(
      path.join(__dirname, "files", "reply.txt"),
      `\n\nYes  it is!!`,
      (err) => {
        if (err) throw err;
        console.log("Append Completed");

        fs.rename(
          path.join(__dirname, "files", "reply.txt"),
          path.join(__dirname, "files", "newReply.txt"),
          (err) => {
            if (err) throw err;
            console.log("Rename Completed");
          }
        );
      }
    );
  }
);

//exit uncaught error
process.on("uncaughtException", (err) => {
  console.error(`There was an uncaught error:${err}`);
  process.exit(1);
});
