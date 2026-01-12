const express = require("express");
const router = express.Router();
const personController = require("../controllers/apiPersonController");

router.get("/", personController.getAllPerson);

router.get("/search", personController.searchPerson);

module.exports = router;