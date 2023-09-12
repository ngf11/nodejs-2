const os = require("os");

console.log(os.type());
console.log(os.version());
console.log(os.homedir());
console.log(__dirname);
console.log(__filename);
console.log("-------");
const path = require("path");
console.log(path.dirname(__filename));
console.log(path.basename(__filename));
console.log(path.basename(__dirname));
console.log(path.extname(__filename));

console.log(path.parse(__filename));

// const math = require("./math");
// console.log(math.add(2, 2));
//
//or
const { add, multiply, subtract, divide } = require("./math");
console.log(add(2, 2));
