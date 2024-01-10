const express = require("express");
const router = express.Router();
const refreshController = require("../controller/refreshTokenControllers");

router.get("/", refreshController.handelRefreshToken);

module.exports = router;
