const express = require("express");
const router = express.Router();
const path = require("path");

router.get("^/$|/index(.html)?", (request, response) => {
  // response.sendFile("./views/index.html", { root: __dirname });
  response.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

router.get("/new-page(.html)?", (request, response) => {
  response.sendFile(path.join(__dirname, "..", "views", "new-page.html"));
});

//Handeling redirect

router.get("/old-page(.html)?|/old-case(.html)? ", (request, response) => {
  response.redirect(301, "/new-page.html"); // 302 by defult
});

module.exports = router;
