const { response } = require("express");
const express = require("express");
const { request } = require("http");
const path = require("path");
const app = express(); //server
const PORT = process.env.PORT || 3500;

// root GET || GEt new page
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
// server lisetitng for request
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
