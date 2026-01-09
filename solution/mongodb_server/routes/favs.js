const express = require("express");
const router = express.Router();
const favsController = require("../controllers/favsController");

// GET all favs
router.get("/favs", favsController.getFavs);

// GET favs by user
router.get("/favs/user/:username", favsController.getFavsByUser);

module.exports = router;
