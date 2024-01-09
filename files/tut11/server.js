const express = require("express");
const app = express(); //server
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { logEvents, logger } = require("./middleware/logEvents");
const errorHandeler = require("./middleware/errorHandeler");
const PORT = process.env.PORT || 3500;

//custum  middelware logger
app.use(logger);

app.use(cors(corsOptions)); // leaving open wiht just this. API open to the public. for many applications this not what you want. creat whitelist

//built in middelware to handel urlencoded data in other words; from data:
//content-Type: application/x-www-from-urluncoded
//from html
app.use(express.urlencoded({ extended: false }));

//built-in middelware for json
app.use(express.json());

//servers static fiels & route
app.use(express.static(path.join(__dirname, "/public")));

//routes
app.use("/", require("./routes/root"));
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/employees", require("./routes/api/employees"));

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
  console.log(`${req.method} ${req.path}`);
  next();
});

// server lisetitng for request
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
