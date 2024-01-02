// console.log("Hello");
// console.log(global);
const os = require("os");
const path = require("path");

console.log(os.type());
console.log(os.version());
console.log(os.homedir());
console.log(__dirname);
console.log(__filename);
console.log("------");
console.log(path.dirname(__filename));
console.log("------");
console.log(path.basename(__filename));
console.log(path.basename(__dirname));
console.log("------");

console.log(path.extname(__filename));
console.log(path.extname(__dirname));
console.log("------");
console.log(path.parse(__filename));

// const math = require("./math.js");
const { add, subtract, multiply, divie } = require("./math");
console.log(add(2, 2));
