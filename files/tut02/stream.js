const fs = require("fs");

const rs = fs.createReadStream("lorem.txt", { encoding: "utf-8" });

const ws = fs.createWriteStream("new-lorem.txt");

//listing for the data form  the readable stream

// rs.on("data", (dataChunk) => {
//   ws.write(dataChunk);
// });

//better way

rs.pipe(ws);
// this acomplish the same thing. Piping is more efficaint
