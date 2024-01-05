const express = require("express");
const app = express(); //server
const path = require("path");
const cors = require("cors");
const { logEvents, logger } = require("./middleware/logEvents");
const PORT = process.env.PORT || 3500;

//custum  middelware logger
app.use(logger);

//third party middelware. allows other request for other partys since  this is running locally
//cors = Cross Origin Resource Sharing
const whitelist = [
  "htts://nicolasfuentes.dev",
  "http://localhost:3500",
  "http://127.0.0.1:5500/",
]; //whitelist typically refers to a list of allowed IP addresses or origins that are permitted to interact with your server. you leave your site after develpent but while working you should leave port you are working whit and live server port.
app.use(cors()); // leaving open wiht just this. API open to the public. for many applications this not what you want. creat whitelist

//built in middelware to handel urlencoded data in other words; from data:
//content-Type: application/x-www-from-urluncoded
//from html
app.use(express.urlencoded({ extended: false }));

//built-in middelware for json
app.use(express.json());

//servers static fiels
app.use(express.static(path.join(__dirname, "/public")));

// root GET || GET new page
app.get("^/$|/index(.html)?", (request, response) => {
  // response.sendFile("./views/index.html", { root: __dirname });
  response.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/new-page(.html)?", (request, response) => {
  response.sendFile(path.join(__dirname, "views", "new-page.html"));
});

//Handeling redirect

app.get("/old-page(.html)?|/old-case(.html)? ", (request, response) => {
  response.redirect(301, "/new-page.html"); // 302 by defult
});
//route hadelrs. handelres chained
app.get(
  "/hello(.html)",
  (request, response, next) => {
    console.log("Attempted to load hello.html");
    next();
  },
  (request, response) => {
    response.send("Hello world");
  }
); // you can keep changing nexts()

//deafult catch all
app.get("/*", (request, response) => {
  response.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

//custum  middelware logger
app.use((req, res, next) => {
  consoles.log(`${req.method} ${req.path}`);
  next();
});

// server lisetitng for request
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
