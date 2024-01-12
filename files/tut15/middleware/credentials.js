const whitelist = require("../config/whitelist");

const credentials = (req, res, next) => {
  const origin = req.headers.origin;
  if (whitelist.includes(origin)) {
    //if the origin that is sending the request in our whitelist
    //then set this header in th response
    res.headers("Access-Control-Allow-Credential", true);
  }
  next();
};

module.exports = credentials;
