const express = require("express");
const router = express.Router();
const characterController = require("../controllers/characterController");

router.get("/character", characterController.getAllCharacter);

router.get("/character/search", characterController.searchCharacter);

module.exports = router;