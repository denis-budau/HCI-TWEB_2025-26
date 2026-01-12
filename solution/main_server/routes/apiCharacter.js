const express = require("express");
const router = express.Router();
const characterController = require("../controllers/apiCharacterController");

router.get("/", characterController.getAllCharacter);

router.get("/search", characterController.searchCharacter);

module.exports = router;