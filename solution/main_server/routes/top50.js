const express = require("express");
const router = express.Router();
const top50Controller = require("../controllers/top50Controller");

router.get("/", top50Controller.top50Page);

module.exports = router;