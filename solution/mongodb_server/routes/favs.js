const express = require("express");
const router = express.Router();
const favsController = require("../controllers/favsController");

// GET all favs
router.get("/getAllFavs", favsController.getAllFavs);

// GET favs by user
router.get("/:username", favsController.getFavsByUser);

module.exports = router;
