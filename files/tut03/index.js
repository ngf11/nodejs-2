const { format } = require("date-fns");
const { v4: uuid } = require("uuid");

console.log(format(new Date(), `MMddyyyy\tHH:mm:ss`));
console.log(uuid());
console.log("fb121191-6349-49a6-bc72-83cc429cbefe".length);
