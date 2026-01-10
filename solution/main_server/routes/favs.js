const express = require("express");
const router = express.Router();
const favsController = require("../controllers/favsController");

router.get("/getAllFavs", favsController.getAllFavs);
router.get("/:username", favsController.getFavsByUser);

module.exports = router;
