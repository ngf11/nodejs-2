const express = require("express");
const app = express(); //server
const path = require("path");
const cors = require("cors");
const { logEvents, logger } = require("./middleware/logEvents");
const errorHandeler = require("./middleware/errorHandeler");
const PORT = process.env.PORT || 3500;

//custum  middelware logger
app.use(logger);

//third party middelware. allows other request for other partys since  this is running locally
//cors = Cross Origin Resource Sharing
const whitelist = ["http://localhost:3500/", "http://127.0.0.1:5500/"];
//whitelist typically refers to a list of allowed IP addresses or origins that are permitted to interact with your server. you leave your site after develpent but while working you should leave port you are working whit and live server port.
//function that allows cors not prevent whitlist

const corsOptions = {
  origin: (origin, callback) => {
    //if the domain is the white list. Then we are going to let it pass. else err

    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true); //null=error/ in this case no erro.if no error let it pass hance "ture" tham means the origin will be sent back. yes that is the same origin
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions)); // leaving open wiht just this. API open to the public. for many applications this not what you want. creat whitelist

//built in middelware to handel urlencoded data in other words; from data:
//content-Type: application/x-www-from-urluncoded
//from html
app.use(express.urlencoded({ extended: false }));

//built-in middelware for json
app.use(express.json());

//servers static fiels & route
app.use(express.static(path.join(__dirname, "/public")));
app.use("/subdir", express.static(path.join(__dirname, "/public"))); // adds the styles and imgs when serving pages from subdir

app.use("/", require("./routes/root"));
app.use("/subdir", require("./routes/subdir")); // this will route any request that comes form the sub directory

//deafult catch all
app.all("*", (request, response) => {
  response.status(404);
  if (request.accepts("html")) {
    response.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (request.accepts("json")) {
    response.json({ error: "404 Not found" });
  } else {
    response.type("txt").send("404 Not found");
  }
});

app.use(errorHandeler);

//custum  middelware logger
app.use((req, res, next) => {
  consoles.log(`${req.method} ${req.path}`);
  next();
});

// server lisetitng for request
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
