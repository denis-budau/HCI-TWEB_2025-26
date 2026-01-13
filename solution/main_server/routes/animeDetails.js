const express = require("express");
const router = express.Router();
const animeDetailsController = require("../controllers/animeDetailsController");

router.get("/", animeDetailsController.getAnimeDetails);

module.exports = router;