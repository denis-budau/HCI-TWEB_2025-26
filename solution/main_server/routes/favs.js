const express = require("express");
const router = express.Router();
const favsController = require("../controllers/favsController");

router.get("/favs", favsController.getFavs);
router.get("/favs/user/:username", favsController.getFavsByUser);

module.exports = router;
