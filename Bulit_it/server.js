const fsPromises = require("fs");
// console.log(fsPomises);
const path = require("path");
// console.log(path);

const fileOps = async () => {
  try {
    const data = await fsPromises.readFile(path.join("readme.txt"), "utf-8");
    console.log(data);
    await fsPromises.unlink(path.join("readme.txt")); //Deletes original file

    await fsPromises.writeFile(path.join("promiseWrite.txt"), data);
    await fsPromises.appendFile(
      path.join("promiseWrite.txt"),
      "\n\n Nice to meet you"
    );
    await fsPromises.rename(
      path.join("promiseWrite.txt"),
      "promiseComplete.txt"
    );
    const newData = await fsPromises.readFile(
      path.join("promiseComplete.txt"),
      "utf-8"
    );
    console.log(newData);
  } catch (err) {
    console.log(err);
  }
};

fileOps();
//exit on uncaught error
process.on("uncaughtException", (err) => {
  console.error(`There was an uncought error: ${err}`);
  process.exit(1);
});
