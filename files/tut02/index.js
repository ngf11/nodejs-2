const fsPromises = require("fs").promises;
const path = require("path");

const fileOps = async () => {
  try {
    const data = await fsPromises.readFile(path.join("starter.txt"), "utf-8");
    console.log(data);
    await fsPromises.unlink(path.join("starter.txt")); //Deletes original file

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

/* 
fs.readFile(path.join("starter.txt"), "utf8", (err, data) => {
  if (err) throw err;
  console.log(data);
});
//call back hell
fs.writeFile(path.join("reply.txt"), "Nice to meet you", (err) => {
  if (err) throw err;
  console.log(`Write Completed`);

  fs.appendFile(path.join("reply.txt"), "\n\nYest it is ", (err) => {
    if (err) throw err;
    console.log(`Append Completed`);
    fs.rename(path.join("reply.txt"), path.join("newReply.txt"), (err) => {
      if (err) throw err;
      console.log(`Rename Completed`);
    });
  });
}); */

//exit on uncaught error
process.on("uncaughtException", (err) => {
  console.error(`There was an uncought error: ${err}`);
  process.exit(1);
});
