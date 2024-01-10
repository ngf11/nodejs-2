//third party middelware. allows other request for other partys since  this is running locally
//cors = Cross Origin Resource Sharing
const whitelist = require("./whitelist");
//whitelist typically refers to a list of allowed IP addresses or origins that are permitted to interact with your server. you leave your site after develpent but while working you should leave port you are working whit and live server port.
//function that allows cors not prevent whitlist

const corsOptions = {
  origin: (origin, callback) => {
    //if the domain is in  the white list. Then we are going to let it pass. else err

    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true); //null=error/ in this case no erro.if no error let it pass hance "ture" that means the origin will be sent back. yes that is the same origin
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
