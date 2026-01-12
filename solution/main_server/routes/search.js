const express = require("express");
const router = express.Router();
const searchController = require("../controllers/searchController");

//router.get("/", animeController.getAllAnimePage);

router.get("/", searchController.searchPage);

module.exports = router;