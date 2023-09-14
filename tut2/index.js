const fsPromises = require("fs").promises;
const path = require("path");
const { exit } = require("process");
const fileOps = async () => {
  try {
    const data = await fsPromises.readFile(
      path.join(__dirname, "files", "started.txt"),
      "utf8"
    );
    await fsPromises.writeFile(
      path.join(__dirname, "files", "promiseWrite.txt"),
      data
    );
    await fsPromises.appendFile(
      path.join(__dirname, "files", "promiseWrite.txt"),
      "\n\n Nice to meet you"
    );
    await fsPromises.rename(
      path.join(__dirname, "files", "promiseWrite.txt"),
      path.join(__dirname, "files", "promiseCompleted.txt")
    );
    const Newdata = await fsPromises.readFile(
      path.join(__dirname, "files", "promiseCompleted.txt"),
      "utf8"
    );
    console.log(Newdata);
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};

fileOps();

/* 
verion one. callback hell

fs.readFile(
  path.join(__dirname, "files", "started.txt"),
  "utf8",
  (err, data) => {
    if (err) throw err;
    console.log(data);
  }
);

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
); */

//exit uncaught error
process.on("uncaughtException", (err) => {
  console.error(`There was an uncaught error:${err}`);
  process.exit(1);
});
